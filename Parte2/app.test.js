const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
//const { expect } = require("chai");
const app = express();

app.use(bodyParser.json());

let pedidos = [];
let rotas = [];

app.get("/pedidos", (req, res) => res.json(pedidos));
app.post("/pedidos", (req, res) => {
  const { endereco, latitude, longitude, produto, quantidade } = req.body;
  if (!endereco || !latitude || !longitude || !produto || !quantidade) {
    return res.status(400).json({ error: "Dados incompletos" });
  }
  const pedido = { endereco, latitude, longitude, produto, quantidade };
  pedidos.push(pedido);
  res.status(201).json(pedido);
});
app.get("/rotas", (req, res) => res.json(rotas));
app.post("/rotas", (req, res) => {
  const { latitude, longitude } = req.body;
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Dados incompletos" });
  }
  const rota = { latitude, longitude };
  rotas.push(rota);
  res.status(201).json(rota);
});

describe("API Testes", () => {
  it("Deve retornar a lista de pedidos", async () => {
    const response = await request(app).get("/pedidos");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("Deve criar um novo pedido", async () => {
    const novoPedido = {
      endereco: { rua: "Rua A", numero: 123 },
      latitude: 12.34,
      longitude: 56.78,
      produto: "Produto X",
      quantidade: 10,
    };
    const response = await request(app).post("/pedidos").send(novoPedido);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({ produto: "Produto X" });
  });

  it("Deve retornar a lista de rotas", async () => {
    const response = await request(app).get("/rotas");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("Deve criar uma nova rota", async () => {
    const novaRota = {
      latitude: 12.34,
      longitude: 56.78,
    };
    const response = await request(app).post("/rotas").send(novaRota);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(novaRota);
    // Verifica se a rota foi adicionada ao array de rotas
    expect(rotas).toContainEqual(novaRota);
  });

  it("Deve retornar a melhor rota", async () => {
    const pedidos = [
      {
        endereco: { rua: "Rua A", numero: 123 },
        latitude: 12.34,
        longitude: 56.78,
      },
      // Adicione mais pedidos conforme necessário
    ];
    const rotas = [
      { latitude: 12.34, longitude: 56.78 },
      // Adicione mais rotas conforme necessário
    ];

    const response = await request(app)
      .post("/melhor-rota")
      .send({ pedidos, rotas });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(rotas[0]); // Assumindo que verificarMelhorRota retorna a primeira rota
  });
});
