import { EntityRepository, Repository } from 'typeorm';

import Order from '../models/Order';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findByDate(created_at: Date): Promise<Order | null> {
    const findOrder = await this.findOne({ where: { created_at } });
    return findOrder || null;
  }
}

export default OrdersRepository;
