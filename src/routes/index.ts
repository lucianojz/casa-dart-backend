import { Router } from 'express';
import ordersRouter from './orders.router';
import customersRouter from './customers.router';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/customers', customersRouter);

export default routes;
