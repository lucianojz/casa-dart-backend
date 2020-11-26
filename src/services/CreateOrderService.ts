import { getCustomRepository } from 'typeorm';

import Order from '../models/Order';
import OrdersRepository from '../repositories/OrdersRepository';

interface Request {
  customer_id: string;
}

class CreateOrderService {
  public async execute({ customer_id }: Request): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = ordersRepository.create({ customer_id });
    await ordersRepository.save(order);
    return order;
  }
}

export default CreateOrderService;
