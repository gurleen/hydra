import type { ConnectedUser, MessageHandler } from '@/shared/types';
import { getLogger } from '@logtape/logtape';
import { Server, Socket } from 'socket.io';

const logger = getLogger(["app", "socket-manager"]);

export class SocketManager {
  private io: Server;
  private connectedUsers: Map<string, ConnectedUser> = new Map();
  private messageHandlers: Map<string, MessageHandler> = new Map();

  constructor(io: Server) {
    this.io = io;
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      this.handleConnection(socket);
    });
  }

  private handleConnection(socket: Socket): void {
    const user: ConnectedUser = {
      id: socket.id,
      socket,
      connectedAt: new Date()
    };

    this.connectedUsers.set(socket.id, user);
    logger.info(`User connected: ${socket.id} (${this.connectedUsers.size} total)`);

    this.messageHandlers.forEach((handler, event) => {
      socket.on(event, (data) => handler(socket, data));
    });

    socket.on('disconnect', () => {
      this.handleDisconnection(socket.id);
    });

    socket.on('ping', () => socket.emit("pong"))

    socket.onAny((event, ...args) => {
        logger.info(`User ${user.id} sent event: ${event}`);
    });
  }

  private handleDisconnection(socketId: string): void {
    this.connectedUsers.delete(socketId);
    logger.info(`User disconnected: ${socketId} (${this.connectedUsers.size} total)`);
  }

  // User management methods
  getConnectedUsers(): ConnectedUser[] {
    return Array.from(this.connectedUsers.values());
  }

  getConnectedUserCount(): number {
    return this.connectedUsers.size;
  }

  getUser(socketId: string): ConnectedUser | undefined {
    return this.connectedUsers.get(socketId);
  }

  updateUserMetadata(socketId: string, metadata: Record<string, any>): void {
    const user = this.connectedUsers.get(socketId);
    if (user) {
      user.metadata = { ...user.metadata, ...metadata };
    }
  }

  // Message handler registration
  registerHandler(event: string, handler: MessageHandler): void {
    this.messageHandlers.set(event, handler);

    // Add handler to all currently connected sockets
    this.connectedUsers.forEach((user) => {
      user.socket.on(event, (...data) => handler(user.socket, data));
    });
  }

  removeHandler(event: string): void {
    this.messageHandlers.delete(event);

    // Remove handler from all currently connected sockets
    this.connectedUsers.forEach((user) => {
      user.socket.removeAllListeners(event);
    });
  }

  // Broadcasting methods
  broadcast(event: string, data: any): void {
    this.io.emit(event, data);
  }

  broadcastToUser(socketId: string, event: string, data: any): void {
    const user = this.connectedUsers.get(socketId);
    if (user) {
      user.socket.emit(event, data);
    }
  }

  broadcastToUsers(socketIds: string[], event: string, data: any): void {
    socketIds.forEach(id => {
      this.broadcastToUser(id, event, data);
    });
  }
}