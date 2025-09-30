using System.Text.Json;
using Microsoft.AspNetCore.SignalR;

namespace HydraServer.Hubs;

public record class BusMessage
{
    public required string Name { get; init; }
    public required string Sender { get; init; }
    public JsonElement? Payload { get; init; }
}

public interface IMessageBusClient
{
    public Task Pong();
    public Task OnBusMessage(BusMessage message);
}

public class MessageBusHub(ILogger<MessageBusHub> logger) : Hub<IMessageBusClient>
{
    public async Task Ping()
    {
        logger.LogInformation("Got ping from a client");
        await Clients.Caller.Pong();
    }

    public async Task DispatchMessage(BusMessage message)
    {
        logger.LogInformation("[{sender}] sent message of type {messageType} with payload: {payload}", message.Sender, message.Name, message.Payload);
        await Clients.Others.OnBusMessage(message);
    }
}