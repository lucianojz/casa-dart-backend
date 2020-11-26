import { Router } from 'express';

import CreateCustomerSessionService from '../services/CreateCustomerSessionService';

const customerSessionsRouter = Router();

customerSessionsRouter.get('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const customerSession = new CreateCustomerSessionService();

    const { customer, token } = await customerSession.execute({
      email,
      password,
    });

    return response.json({ customer, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default customerSessionsRouter;
