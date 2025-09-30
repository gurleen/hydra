import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { SocketManager } from "./socket-manager";
import { RendererManager } from "./renderer-manager";

export default function setupSocketServer(): [Engine, SocketManager, RendererManager] {
    const io = new Server({
        cors: {
            origin: ["*"]
        }
    });
    const engine = new Engine({
        path: "/socket.io/",
    });
    io.bind(engine);

    const socketManager = new SocketManager(io);
    const rendererManager = new RendererManager(socketManager);

    return [engine, socketManager, rendererManager];
}