import { getCustomRepository, getRepository } from 'typeorm';

import Order from '../models/Order';
import OrdersRepository from '../repositories/OrdersRepository';
import OrderProduct from '../models/OrderProduct';

interface OrderProductRequest {
  product_id: string;
  quantity: number;
  value: number;
  freight_charge: number;
}

interface Request {
  customer_id: string;
  products: OrderProductRequest[];
}

interface Response {
  order: Order;
  orderProducts: OrderProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: Request): Promise<Response> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const orderProductsRepo = getRepository(OrderProduct);

    const order = ordersRepository.create({ customer_id });
    await ordersRepository.save(order);

    const orderProducts = [] as OrderProduct[];

    const { id: order_id } = order;

    await products.map(
      async (product): Promise<void> => {
        const { product_id, freight_charge, quantity, value } = product;
        const orderProductInserted = orderProductsRepo.create({
          order_id,
          product_id,
          freight_charge,
          quantity,
          value,
        });
        await orderProductsRepo.save(orderProductInserted);

        console.log(orderProductInserted);

        orderProducts.push(orderProductInserted);
      },
    );

    return { order, orderProducts };
  }
}

export default CreateOrderService;
