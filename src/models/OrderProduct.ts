import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Order from './Order';
import Product from './Product';

@Entity('order_products')
class OrderProduct {
  @PrimaryColumn()
  order_id: string;

  @ManyToOne(() => Order, order => order.id, { primary: true })
  @JoinColumn({ name: 'order_id' })
  order: Promise<Order>;

  @PrimaryColumn()
  product_id: string;

  @ManyToOne(() => Product, product => product.id, { primary: true })
  @JoinColumn({ name: 'product_id' })
  product: Promise<Product>;

  @Column('numeric')
  quantity: number;

  @Column('numeric')
  value: number;

  @Column('numeric')
  freight_charge: number;
}

export default OrderProduct;
