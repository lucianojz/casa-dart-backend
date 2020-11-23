import { Router } from 'express';
import { v4 as uuid } from 'uuid';
// import

const pedidosRouter = Router();

const pedidos = [];

pedidosRouter.post('/', (request, response) => {
  const { cliente, produto } = request.body;

  const pedido = {
    id: uuid(),
    data_emissao: new Date(),
    cliente,
    produto,
  };

  pedidos.push(pedido);
  return response.json(pedido);
});

export default pedidosRouter;
