import type { GraphicState } from "./enums";

export enum SocketMessages {
    SetActiveGraphic = "renderer:set-active-graphic",
    RendererStateChange = "renderer:state-change",
    SetGraphicState = "renderer:set-graphic-state",
    RendererRequestPlay = "renderer:request:play",
    RendererRequestStop = "renderer:request:stop",
    RendererRequestNext = "renderer:request:next",
    RendererActionPlay = "renderer:action:play",
    RendererActionStop = "renderer:action:stop",
    RendererActionNext = "renderer:action:next"
}

export type SetActiveGraphicMessage = {
    name: string;
}

export type SetGraphicStateMessage = {
    newState: GraphicState;
}