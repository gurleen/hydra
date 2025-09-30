import { useAnimate, type AnimationScope, type AnimationSequence } from "motion/react"
import { useEffect, useState, type SetStateAction } from "react";
import type { AnimationControls, AnimationDefinition, RendererState } from "@/shared/types";
import { GraphicState } from "@/shared/enums";
import type { SequenceOptions } from "motion";
import { MessageBus } from "./message-bus";
import { deserializeGraphicProps, type GraphicDefinition } from "@/shared/graphic-definition";

export type UseGraphicReturn<T> = {
    scope: AnimationScope;
    graphicState: GraphicState;
    controls: AnimationControls;
    props: T
};

export default function useGraphic<T extends Record<string, any>>(def: GraphicDefinition<T>): UseGraphicReturn<T> {
    const [scope, animate] = useAnimate();
    const [graphicState, setGraphicState] = useState(GraphicState.Initialized);
    const [animStage, setAnimStage] = useState(0);
    const [rawProps, setRawProps] = useState({});
    const anim = def.animation;
    
    const graphicProps = deserializeGraphicProps(def, rawProps);
    const rendererState: RendererState = {
        activeGraphic: def.name,
        graphicState: graphicState,
        currentStep: animStage,
        totalSteps: anim.stages.length - 1
    }

    useEffect(() => {
        if (graphicState == GraphicState.Initialized && anim.setup.length > 0) {
            animate(anim.setup).then(() => setGraphicState(GraphicState.Stopped));
        }
        MessageBus.emit("renderer:state-change", rendererState);
        MessageBus.emit("")
    }, [graphicState]);

    function animateAsync(sequence: AnimationSequence, options?: SequenceOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            animate(sequence, options).then(resolve, reject);
        });
    }

    const controls: AnimationControls = createAnimControls({
        def: anim,
        animStage,
        setAnimStage,
        animateAsync,
        setGraphicState,
        graphicState
    });

    setUpMessageBus(controls);
    MessageBus.on("renderer:update", (rawData: any) => setRawProps({...rawProps, ...rawData}));

    return { scope, graphicState, controls, props: graphicProps };
}

type CreateAnimControlsProps = {
    def: AnimationDefinition;
    animStage: number;
    setAnimStage: (value: SetStateAction<number>) => void;
    animateAsync: (sequence: AnimationSequence, options?: SequenceOptions) => Promise<void>;
    setGraphicState: (value: SetStateAction<GraphicState>) => void;
    graphicState: GraphicState;
};

function createAnimControls({
    def,
    animStage,
    setAnimStage,
    animateAsync,
    setGraphicState,
    graphicState,
}: CreateAnimControlsProps): AnimationControls {
    const finalStage = def.stages.length - 1;
    const isFinalStage = () => animStage == finalStage;
    const hasNextStage = () => animStage < finalStage;
    const incrementStage = () => setAnimStage(x => x == finalStage ? 0 : x + 1);
    const currentStage = () => def.stages[animStage];

    async function animateCurrentStage() {
        let current = currentStage();
        if (current) { await animateAsync(current); }
    }

    async function blank() {
        await animateAsync(def.setup);
        setGraphicState(GraphicState.Stopped);
        setAnimStage(0);
    }

    const controls: AnimationControls = {
        blank: blank,
        canPlay: () => graphicState == GraphicState.Stopped,
        play: async () => {
            if (graphicState != GraphicState.Stopped) { return; }
            setGraphicState(GraphicState.AnimatingIn);
            await animateCurrentStage();
            setGraphicState(GraphicState.Playing);
            incrementStage();
        },
        canStop: () => graphicState == GraphicState.Playing && isFinalStage(),
        stop: async () => {
            if (graphicState != GraphicState.Playing || hasNextStage()) { return; }
            setGraphicState(GraphicState.AnimatingOut);
            await animateCurrentStage();
            await blank();
        },
        canNext: () => graphicState == GraphicState.Playing && hasNextStage(),
        next: async () => {
            if (graphicState != GraphicState.Playing || isFinalStage()) { return; }
            setGraphicState(GraphicState.AnimatingStage);
            await animateCurrentStage();
            setGraphicState(GraphicState.Playing);
            incrementStage();
        },
        ready: () => graphicState != GraphicState.Initialized
    };
    return controls;
}

function setUpMessageBus(controls: AnimationControls) {
    MessageBus.on("renderer:play", controls.play);
    MessageBus.on("renderer:stop", controls.stop);
    MessageBus.on("renderer:next", controls.next);
    MessageBus.on("renderer:blank", controls.blank);
}
