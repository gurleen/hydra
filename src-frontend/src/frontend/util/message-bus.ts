import Emittery from 'emittery';

export const MessageBus = new Emittery();

MessageBus.onAny((name, args) => {
    console.log(`MessageBus: emitted event ${name.toString()} with args`, args);
})