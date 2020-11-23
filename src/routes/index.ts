import { Router } from 'express';
import pedidosRouter from './pedidos.router';

const routes = Router();

routes.use('/pedidos', pedidosRouter);

export default routes;
