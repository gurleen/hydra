import { useEffect, useState } from "react";
import { graphicRegistry } from "@/shared/graphics-registry";
import { useBusClient } from "../util/use-bus-client";
import { MessageBus } from "../util/message-bus";

export default function Renderer() {
    const busClient = useBusClient();
    const [currentTemplateName, setCurrentTemplateName] = useState<string | undefined>();
    const CurrentGraphic = currentTemplateName ? graphicRegistry.getByName(currentTemplateName) : undefined;

    useEffect(() => {
        busClient?.on("renderer:load", (templateName: string) => {
            console.log(`renderer:load called with ${templateName}`);
            setCurrentTemplateName(templateName);
        });
    }, [busClient]);

    MessageBus.onAny((key, data) => {
        busClient?.dispatchMessage(key.toString(), data);
    })

    return (
        <>
            {CurrentGraphic && <CurrentGraphic.component />}
        </>
    );
}