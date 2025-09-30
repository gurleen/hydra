import { serve } from "bun";
import index from "./index.html";
import setupLogging from "./shared/logging";
import { getLogger } from "@logtape/logtape";

await setupLogging();
const logger = getLogger(["app", "entrypoint"]);

const server = serve({
  // ...engine.handler(),
  routes: {
    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/app/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: false,
    console: true,
  },
});

logger.info(`🚀 Server running at ${server.url}app/`);