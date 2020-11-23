import { Router } from 'express';
import PedidosRepository from '../repositories/PedidosRepository';
import CreatePedidoService from '../services/CreatePedidoService';

const pedidosRouter = Router();
const pedidosRepository = new PedidosRepository();

pedidosRouter.post('/', (request, response) => {
  try {
    const { cliente, produto } = request.body;
    const createPedido = new CreatePedidoService(pedidosRepository);

    const pedido = createPedido.execute({ cliente, produto });

    return response.json(pedido);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

pedidosRouter.get('/', (request, response) => {
  const pedidos = pedidosRepository.all();

  return response.json(pedidos);
});

export default pedidosRouter;
