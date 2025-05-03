import { expect, test, beforeAll, afterAll, describe } from "vitest";
import { app } from "../src/app.js";
import request from "supertest";

describe("Transactions Rotues", () => {
  // Executar uma unica vez antes de todos os testes
  beforeAll(async () => {
    await app.ready();
  });

  // Executar uma unica vez depois de todos os testes
  afterAll(async () => {
    await app.close();
  });

  test("user can create a new transaction", async () => {
    const response = await request(app.server).post("/transactions").send({
      title: "Transação de teste",
      amount: 5000,
      type: "credit",
    });

    expect(response.statusCode).toEqual(201);
  });
});
