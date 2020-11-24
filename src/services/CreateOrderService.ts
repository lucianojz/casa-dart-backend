import { getCustomRepository } from 'typeorm';

import Order from '../models/Order';
import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
  customer: string;
}

class CreateOrderService {
  public async execute({ customer }: Request): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = ordersRepository.create({ customer });
    await ordersRepository.save(order);
    return order;
  }
}

export default CreateOrderService;
