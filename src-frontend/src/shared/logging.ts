import { configure, getConsoleSink } from "@logtape/logtape";
import { prettyFormatter } from "@logtape/pretty";

export default async function setupLogging() {
    await configure({
        sinks: {
            console: getConsoleSink({ formatter: prettyFormatter })
        },
        filters: {},
        loggers: [
            { category: ["logtape", "meta"], lowestLevel: "error", sinks: ["console"] },
            { category: ["app"], sinks: ["console"] },
        ],
    });
}