import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import Customer from '../models/Customer';

interface Request {
  email: string;
  password: string;
}

interface Response {
  customer: Customer;
  token: string;
}

class CreateCustomerSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({ where: { email } });

    if (!customer) {
      throw new AppError('Invalid email or password', 401);
    }

    const passwordMatched = await compare(password, customer.password);

    if (!passwordMatched) {
      throw new AppError('Invalid email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    delete customer.document;
    delete customer.birth_date;
    delete customer.phone;
    delete customer.password;
    delete customer.city;
    delete customer.state;
    delete customer.address;
    delete customer.address_complement;
    delete customer.postal_code;

    return {
      customer,
      token,
    };
  }
}

export default CreateCustomerSessionService;
