const testerotas = require("./rotas");

class Rota {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude; //aonde ele deve ir
  }
}
class Pedido {
  constructor(latitude, longitude) {
    this.endereco = { latitude, longitude }; //destino
  }
}
test("Verifica Melhor rota de um Pedido", () => {
  let pedido1 = new Pedido(-7.209356327449142, -35.872522864418514); //casa
  let rota1 = new Rota(-7.208510127380219, -35.87217954166949); //aonde devo percorrer o que ele deve retornar //BALAO MAGICO
  let rota2 = new Rota(-7.209395056554138, -35.876177363115644); //pior rota vip dog
  let pedidos = [pedido1];
  let rotas = [rota1, rota2];
  expect(testerotas.verificarMelhorRota(pedidos, rotas)).toEqual(rota1);
});

test("Verifica Melhor rota para Vários Pedidos", () => {
  let pedido1 = new Pedido(-7.209356327449142, -35.872522864418514); //casa
  let pedido2 = new Pedido(-7.211337917805569, -35.87605532260834); //Exitus Residence
  let pedido3 = new Pedido(-7.212044367052155, -35.87514633526673);
  let rota1 = new Rota(-7.208510127380219, -35.87217954166949); //aonde devo percorrer o que ele deve retornar //BALAO MAGICO
  let rota2 = new Rota(-7.209395056554138, -35.876177363115644); //pior rota vip dog
  let rota3 = new Rota(-7.210291191913565, -35.87378518555285); //o retorno dele é esse a escola habilis
  let pedidos = [pedido1, pedido2, pedido3];
  let rotas = [rota1, rota2, rota3];
  expect(testerotas.verificarMelhorRota(pedidos, rotas)).toEqual(rota3);
});

test("Calcular a Distancia entre os pontos", () => {
  let pedido1 = new Pedido(-7, -4); //casa
  let pedido2 = new Pedido(-7.2, -35); //Exitus Residence
  expect(
    testerotas.calcularDistancia(pedido1.endereco, pedido2.endereco)
  ).toEqual(31.000645154577025);
});
