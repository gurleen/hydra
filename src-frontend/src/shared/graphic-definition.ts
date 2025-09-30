import type { AnimationDefinition, HexColor } from "./types";

export type GraphicPropForValue<T> =
    T extends string ? StringProp :
    T extends HexColor ? HexColorProp :
    never;

export type GraphicDefinition<T extends Record<string, any>> = {
    name: string
    component: React.FC,
    animation: AnimationDefinition,
    props: {
        [K in keyof T]: GraphicPropForValue<T[K]>
    }
}

export interface BaseGraphicProp {
    id: string,
    displayName: string
}

export type StringProp = BaseGraphicProp & {
    type: "string"
    defaultValue: string
}

export type HexColorProp = BaseGraphicProp & {
    type: "hex-color"
    defaultValue: HexColor
}

export type GraphicProp = StringProp | HexColorProp;

export type GraphicPropType = GraphicProp["type"];

export function deserializeGraphicProps<T extends Record<string, any>>(
    definition: GraphicDefinition<T>,
    rawJson: Record<string, any>
): T {
    const result = {} as T;

    for (const key in definition.props) {
        const prop = definition.props[key];
        const value = rawJson[key];

        if (value !== undefined) {
            result[key] = value;
        } else {
            result[key] = prop.defaultValue as T[typeof key];
        }
    }

    return result;
}