import { Router } from 'express';

import CreateCustomerSessionService from '../services/CreateCustomerSessionService';

const customerSessionsRouter = Router();

customerSessionsRouter.get('/', async (request, response) => {
  const { email, password } = request.body;
  const customerSession = new CreateCustomerSessionService();

  const { customer, token } = await customerSession.execute({
    email,
    password,
  });

  return response.json({ customer, token });
});

export default customerSessionsRouter;
