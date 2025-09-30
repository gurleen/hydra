import { BusClient } from "@/shared/bus-client";
import { useEffect, useRef, useState } from "react";

export const useBusClient = (): BusClient | null => {
  const [client, setClient] = useState<BusClient | null>(null);

  useEffect(() => {
    const newConn = new BusClient("Client");
    setClient(newConn);

    return () => {
        console.log("Running useBusClient dispose, client =", client);
    }
  }, []);

  useEffect(() => {
    if(client) {
        client.connect();
    }
  }, [client])

  return client;
};