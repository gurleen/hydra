import type { Socket } from "socket.io";
import type { GraphicState } from "./enums";
import type { AnimationSequence } from "motion";

export type RendererMessageHandler<T> = (data: T) => void;

export type RendererState = {
    activeGraphic: string | null
    graphicState: GraphicState
    currentStep: number
    totalSteps: number
}

export type MessageHandler = (socket: Socket, data: any) => void;

export interface ConnectedUser {
  id: string;
  socket: Socket;
  connectedAt: Date;
  metadata?: Record<string, any>;
}

export interface AnimationDefinition {
    setup: AnimationSequence
    stages: AnimationSequence[]
}

export interface AnimationControls {
    blank: () => Promise<void>;
    canPlay: () => boolean;
    play: () => Promise<void>;
    canNext: () => boolean;
    next: () => Promise<void>;
    canStop: () => boolean;
    stop: () => Promise<void>;
    ready: () => boolean;
}

export type HexColor = `#${string}`;