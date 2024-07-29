const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let pedidos = [];
let rotas = [];

// Função para calcular a distância entre dois pontos
function calcularDistancia(endereco1, endereco2) {
  return Math.sqrt(
    Math.pow(endereco2.latitude - endereco1.latitude, 2) +
      Math.pow(endereco2.longitude - endereco1.longitude, 2)
  );
}

// Função para verificar a melhor rota
function verificarMelhorRota(pedidos, rotas) {
  let melhorRota = null;
  let menorDistancia = Infinity;

  rotas.forEach((rota) => {
    let distanciaTotal = 0;

    pedidos.forEach((pedido) => {
      distanciaTotal += calcularDistancia(pedido.endereco, rota);
    });

    if (distanciaTotal < menorDistancia) {
      menorDistancia = distanciaTotal;
      melhorRota = rota;
    }
  });

  return melhorRota;
}

// GET /pedidos
app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

// POST /pedidos
app.post("/pedidos", (req, res) => {
  const { endereco, latitude, longitude, produto, quantidade } = req.body;
  if (!endereco || !latitude || !longitude || !produto || !quantidade) {
    return res.status(400).json({ error: "Dados incompletos" });
  }
  const pedido = { endereco, latitude, longitude, produto, quantidade };
  pedidos.push(pedido);
  res.status(201).json(pedido);
});

// GET /rotas
app.get("/rotas", (req, res) => {
  res.json(rotas);
});

// POST /rotas
app.post("/rotas", (req, res) => {
  const { latitude, longitude } = req.body;
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Dados incompletos" });
  }
  const rota = { latitude, longitude };
  rotas.push(rota);
  res.status(201).json(rota);
});

// POST /melhor-rota
app.post("/melhor-rota", (req, res) => {
  const { pedidos, rotas } = req.body;
  if (!pedidos || !rotas) {
    return res.status(400).json({ error: "Dados incompletos" });
  }
  const melhorRota = verificarMelhorRota(pedidos, rotas);
  res.json(melhorRota);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
