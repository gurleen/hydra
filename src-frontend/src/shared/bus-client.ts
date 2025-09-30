import { MessageBus } from "@/frontend/util/message-bus";
import * as signalR from "@microsoft/signalr";

export interface BusMessage {
    name: string,
    sender: string,
    payload?: any
}

export type BusClientHandler =  (...args: any[]) => any;
export type BusClientAnyHandler = (message: BusMessage) => void;

export class BusClient {
    private connection: signalR.HubConnection;
    private senderName: string;
    private handlers: Map<string, BusClientHandler>;

    constructor(senderName: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5135/hub")
            .build();
        this.senderName = senderName;
        this.handlers = new Map<string, BusClientHandler>();
        this.initHandler();
        console.log("Initialized BusClient");
    }

    async connect() {
        await this.connection.start();
    }

    private initHandler() {
        this.connection.on("OnBusMessage", (message: BusMessage) => {
            console.log("OnBusMessage: ", message);
            if(this.handlers.has(message.name)) {
                const handler = this.handlers.get(message.name);
                if(handler) { handler(message.payload); }
            }
            MessageBus.emit(message.name, message.payload);
        });
    }

    async ensureConnection() {
        if(this.connection.state != signalR.HubConnectionState.Connected) {
            await this.connection.start();
        }
    }

    async ping() {
        await this.connection.send("Ping");
    }

    async dispatchMessage(messageName: string, payload?: any) {
        await this.ensureConnection();
        const message: BusMessage = {
            name: messageName,
            sender: this.senderName,
            payload: payload
        };
        await this.connection.send("DispatchMessage", message);
    } 

    on(messageName: string, handler: BusClientHandler) {
        this.handlers.set(messageName, handler);
    }

    /**
     * Stop the underlying SignalR connection. Call this when the client is no longer needed.
     */
    async dispose() {
        console.log("Attempting to stop BusClient...")
        try {
            await this.connection.stop();
            console.log("Disposing BusClient!");
        } catch (e) {
            // ignore stop errors during teardown
            console.warn("BusClient.dispose: error stopping connection", e);
        }
    }
}