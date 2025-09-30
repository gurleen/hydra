import { Button, Card, FormGroup, HTMLSelect, InputGroup, Tag } from "@blueprintjs/core";
import {useBusClient} from "../util/use-bus-client";
import type { BusClient } from "@/shared/bus-client";
import { useEffect, useState } from "react";
import { graphicRegistry } from "@/shared/graphics-registry";
import type { GraphicDefinition, GraphicProp } from "@/shared/graphic-definition";
import { GraphicState } from "@/shared/enums";
import type { RendererState } from "@/shared/types";


export default function SocketTestPage() {
    const busClient = useBusClient();
    const [rendererState, setRendererState] = useState<RendererState | undefined>(undefined);

    if(busClient == undefined) return (
        <div>Loading...</div>
    );

    busClient?.on("renderer:state-change", setRendererState);

    return (
        <div className="flex flex-col gap-2">
            <GraphicStateTag state={rendererState?.graphicState} />
            <GraphicSelect busClient={busClient} />
            <GraphicControls busClient={busClient} currentState={rendererState} />
        </div>
    );
}

function GraphicStateTag({state}: { state?: GraphicState}) {
    const stateString = GraphicState[state ?? 0];
    return (
        <Tag>{stateString}</Tag>
    );
}

function isFinalStage(currentState?: RendererState): boolean {
    if(currentState != undefined) {
        return currentState.currentStep == currentState.totalSteps
    }
    return false;
}

function GraphicControls({ busClient, currentState }: { busClient: BusClient, currentState?: RendererState}) {
    const state = currentState?.graphicState ?? GraphicState.Unknown;
    async function clickPlay() { await busClient.dispatchMessage("renderer:play"); }
    async function clickNext() { await busClient.dispatchMessage("renderer:next"); }
    async function clickStop() { await busClient.dispatchMessage("renderer:stop"); }
    async function clickBlank() { await busClient.dispatchMessage("renderer:blank"); }
    
    const disablePlay = state != GraphicState.Stopped;
    const disableStop = state != GraphicState.Playing || !isFinalStage(currentState);
    const disableNext = state != GraphicState.Playing || isFinalStage(currentState);


    return (
        <div className="flex m-4 gap-2">
            <Button disabled={disablePlay} onClick={clickPlay} text="Play" intent="success" />
            <Button disabled={disableNext} onClick={clickNext} text="Next" intent="primary" />
            <Button disabled={disableStop} onClick={clickStop} text="Stop" intent="danger" />
            <Button onClick={clickBlank} text="Blank" intent="danger" />
        </div>
    );
}

function GraphicSelect({ busClient }: { busClient: BusClient}) {
    const templateNames = graphicRegistry.getAll().map(x => x.name);
    const [selectedTemplateName, setSelectedTemplateName] = useState(templateNames[0]);
    const selectedTemplate = graphicRegistry.getByName(selectedTemplateName ?? "");

    function handleTemplateChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedTemplateName(event.currentTarget.value);
        busClient.dispatchMessage("renderer:load", event.currentTarget.value);
    }

    return (
        <div className="flex flex-col gap-2">
            <HTMLSelect options={templateNames} onChange={handleTemplateChange} />
            {selectedTemplate && <GraphicPropsForm def={selectedTemplate} busClient={busClient} />}
        </div>
    );
}

function GraphicPropsForm({ def, busClient }: { def: GraphicDefinition<any>, busClient: BusClient }) {
    const [values, setValues] = useState<Record<string, any>>({});
    const fields = Object.values(def.props);

    const handleFieldChange = (key: string, value: any) => {
        setValues(prev => ({ ...prev, [key]: value }));
    };

    const sendUpdate = () => {
        console.log(values);
        busClient.dispatchMessage("renderer:update", values);
    }

    useEffect(() => {
        console.log("Template changed, resetting map")
        setValues({});
    }, [def])

    return (
        <Card>
            {fields.map(x => (
                <GraphicPropField key={x.id} prop={x} onChange={v => handleFieldChange(x.id, v)} />
            ))}
            <Button onClick={sendUpdate} text="Update" />
        </Card>
    );
}

function GraphicPropField({ prop, onChange }: { prop: GraphicProp, onChange: (val: string) => void }) {
    return (
        <FormGroup label={prop.displayName} labelFor={prop.id}>
            <InputGroup id={prop.id} defaultValue={prop.defaultValue} onChange={(x) => onChange(x.currentTarget.value)} />
        </FormGroup>
    );
}