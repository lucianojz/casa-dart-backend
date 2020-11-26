import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Customer from '../models/Customer';

interface Request {
  full_name: string;
  document: string;
  birth_date: Date;
  phone: string;
  email: string;
  password: string;
  city: string;
  state: string;
  address: string;
  address_complement: string;
  postal_code: string;
}

class CreateCustomerService {
  public async execute({
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
  }: Request): Promise<Customer> {
    const customerRepository = getRepository(Customer);
    const checkCustomerExists = await customerRepository.findOne({
      where: { email },
    });

    if (checkCustomerExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const customer = customerRepository.create({
      full_name,
      document,
      birth_date,
      phone,
      email,
      password: hashedPassword,
      city,
      state,
      address,
      address_complement,
      postal_code,
    });

    await customerRepository.save(customer);

    delete customer.password;

    return customer;
  }
}

export default CreateCustomerService;
