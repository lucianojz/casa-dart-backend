import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OrdersRepository from '../repositories/OrdersRepository';
import CreateOrderService from '../services/CreateOrderService';

import ensureCustomerAuthenticated from '../middlewares/ensureCustomerAuthenticated';

const ordersRouter = Router();

ordersRouter.use(ensureCustomerAuthenticated);

ordersRouter.get('/', async (request, response) => {
  const { id: customer_id } = request.customer;

  const ordersRepository = getCustomRepository(OrdersRepository);
  const orders = await ordersRepository.find({ where: { customer_id } });

  return response.json(orders);
});

ordersRouter.post('/', async (request, response) => {
  const { id: customer_id } = request.customer;

  const { products } = request.body;
  const createOrder = new CreateOrderService();

  const { order, orderProducts } = await createOrder.execute({
    customer_id,
    products,
  });

  return response.json({ order, orderProducts });
});

export default ordersRouter;
