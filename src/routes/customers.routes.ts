import { Router } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';

const customersRouter = Router();

customersRouter.post('/', async (request, response) => {
  const {
    full_name,
    document,
    birth_date,
    phone,
    email,
    password,
    city,
    state,
    address,
    address_complement,
    postal_code,
  } = request.body;

  const createCustomer = new CreateCustomerService();

  const customer = await createCustomer.execute({
    full_name,
    document,
    birth_date,
    phone,
    email,
    password,
    city,
    state,
    address,
    address_complement,
    postal_code,
  });

  return response.json(customer);
});

export default customersRouter;
