import { Router } from 'express';
import ordersRouter from './orders.routes';
import productsRouter from './products.routes';
import customersRouter from './customers.routes';
import customerSessionsRouter from './customerSessions.routes';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/products', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/customerSessions', customerSessionsRouter);

export default routes;
