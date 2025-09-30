import AnimationContainer from "@/frontend/components/animation-container";
import { Rect } from "@/frontend/components/rect";
import useGraphic from "@/frontend/util/use-graphic";
import type { GraphicDefinition } from "@/shared/graphic-definition";

const LOGO_URL = "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Drexel_Dragons_logo.svg/1200px-Drexel_Dragons_logo.svg.png"

export function BasicLowerThirdsSingleComponent() {
    const { scope, controls, props } = useGraphic(BasicLowerThirdsSingle);

    return (
        <div ref={scope}>
            <AnimationContainer controls={controls}>
                <div id="lower-third" className="flex flex-col justify-end items-center h-full" style={{ fontFamily: 'Libre Franklin', color: "white" }}>
                    <Rect width={850} height={100} color="#000" className="flex mb-30 rounded-xl">
                        <Rect width={200} height={100} color="#07294D">
                            <img src={LOGO_URL} style={{ transform: `translateY(-30px)`, opacity: 0.9 }} />
                        </Rect>
                        <div className="flex flex-col ms-3">
                            <p className="pt-3 font-bold text-3xl">{props.title}</p>
                            <p className="text-xl">{props.subtitle}</p>
                        </div>
                    </Rect>
                </div>
            </AnimationContainer>
        </div>
    );
}

type BasicLowerThirdsSingleProps = {
    title: string;
    subtitle: string;
}

const BasicLowerThirdsSingle: GraphicDefinition<BasicLowerThirdsSingleProps> = {
    name: "Basic Lower Thirds Single",
    component: BasicLowerThirdsSingleComponent,
    animation: {
        setup: [
            ["#lower-third", { opacity: 0 }, { duration: 0.01 }]
        ],
        stages: [
            [
                ["#lower-third", { opacity: [0, 1], x: [-100, 0] }, { duration: 0.3 }]
            ],
            [
                ["#lower-third", { opacity: [1, 0], x: [0, 100] }, { duration: 0.3 }]
            ]
        ]
    },
    props: {
        title: {
            type: "string",
            id: "title",
            displayName: "Title",
            defaultValue: "TITLE OF LOWER THIRD"
        },
        subtitle: {
            type: "string",
            id: "subtitle",
            displayName: "Subtitle",
            defaultValue: "SUBTITLE OF LOWER THIRD"
        }
    }
}

export default BasicLowerThirdsSingle;