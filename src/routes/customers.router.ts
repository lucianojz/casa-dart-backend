import { Router } from 'express';
import { getRepository } from 'typeorm';

import Customer from '../models/Customer';

const customersRouter = Router();

customersRouter.post('/', async (request, response) => {
  const {
    full_name,
    document,
    birth_date,
    phone,
    password,
    city,
    state,
    address,
    address_complement,
    postal_code,
  } = request.body;

  const customerRepository = getRepository(Customer);

  const customer = customerRepository.create({
    full_name,
    document,
    birth_date,
    phone,
    password,
    city,
    state,
    address,
    address_complement,
    postal_code,
  });

  await customerRepository.save(customer);

  return response.json(customer);
});

export default customersRouter;
