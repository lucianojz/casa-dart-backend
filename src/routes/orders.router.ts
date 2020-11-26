import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OrdersRepository from '../repositories/OrdersRepository';
import CreateOrderService from '../services/CreateOrderService';

const ordersRouter = Router();

ordersRouter.post('/', async (request, response) => {
  try {
    const { customer_id } = request.body;
    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id });

    return response.json(order);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

ordersRouter.get('/', async (request, response) => {
  const ordersRepository = getCustomRepository(OrdersRepository);
  const orders = await ordersRepository.find();

  return response.json(orders);
});

export default ordersRouter;
