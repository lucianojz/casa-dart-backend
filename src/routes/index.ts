import { Router } from 'express';
import ordersRouter from './orders.router';
import customersRouter from './customers.router';
import customerSessionsRouter from './customerSessions.router';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/customers', customersRouter);
routes.use('/customerSessions', customerSessionsRouter);

export default routes;
