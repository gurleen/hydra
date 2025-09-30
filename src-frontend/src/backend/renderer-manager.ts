import type { SocketManager } from "./socket-manager";
import { SocketMessages, type SetActiveGraphicMessage, type SetGraphicStateMessage } from "@/shared/socket-messages";
import { GraphicState } from "@/shared/enums";
import { graphicRegistry } from "@/shared/graphics-registry";
import { getLogger } from "@logtape/logtape";
import type { RendererMessageHandler, RendererState } from "@/shared/types";

const logger = getLogger(["app", "renderer-manager"]);

export class RendererManager {
    private socketManager: SocketManager;
    private state: RendererState;

    constructor(socketManager: SocketManager) {
        this.socketManager = socketManager;
        this.state = { activeGraphic: null, graphicState: GraphicState.Unknown };
        this.initSocketHandlers();
    }

    private initSocketHandlers() {
        logger.info("Attaching handlers to socket manager...");
        this.registerHandler<SetActiveGraphicMessage>(SocketMessages.SetActiveGraphic, this.setActiveGraphic);
        this.registerHandler<SetGraphicStateMessage>(SocketMessages.SetGraphicState, this.setGraphicState);
        this.registerHandler(SocketMessages.RendererRequestPlay, this.playAction);
        this.registerHandler(SocketMessages.RendererRequestStop, this.stopAction);
        this.registerHandler(SocketMessages.RendererActionNext, this.nextAction);
    }

    private registerHandler<T>(messageName: SocketMessages, handler: RendererMessageHandler<T>) {
        this.socketManager.registerHandler(messageName, (socket, data) => {
            handler.call(this, data);
        });
    }

    private emit<T>(messageName: SocketMessages, data: T) {
        this.socketManager.broadcast(messageName, data);
    }

    private event(messageName: SocketMessages) { this.socketManager.broadcast(messageName, null); }

    private broadcastStateChange() {
        logger.info(`New renderer state: ${this.state}`);
        this.emit(SocketMessages.RendererStateChange, this.state);
    }

    private setActiveGraphic(message: SetActiveGraphicMessage) {
        const newGraphic = graphicRegistry.getByName(message.name);
        if(newGraphic) {
            this.state.activeGraphic = message.name;
            this.broadcastStateChange();
        }
    }

    private setGraphicState(message: SetGraphicStateMessage) {
        logger.info(`setGraphicState ${message}`);
        this.state.graphicState = message.newState;
        this.broadcastStateChange();
    }

    private playAction = () => this.event(SocketMessages.RendererActionPlay);
    private stopAction = () => this.event(SocketMessages.RendererActionStop);
    private nextAction = () => this.event(SocketMessages.RendererActionNext);
}