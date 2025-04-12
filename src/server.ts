import { fastify } from "fastify";
import { transactionsRoutes } from "./modules/transactions/transactions";
import cookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Transactions API",
      version: "0.0.1",
      description: "API for managing transactions",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(cookie);
app.register(transactionsRoutes, { prefix: "transactions" });

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP Server Running!");
});
