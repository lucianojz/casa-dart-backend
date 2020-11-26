import { Router } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';

import FindProductsService from '../services/FindProductsService';

const productsRouter = Router();

productsRouter.post('/', async (request, response) => {
  const {
    name,
    description,
    reference,
    value,
    promo_value,
    freight_charge,
  } = request.body;

  const productRepository = getRepository(Product);

  const product = productRepository.create({
    name,
    description,
    reference,
    value,
    promo_value,
    freight_charge,
  });
  productRepository.save(product);

  return response.json({ name, reference, description, value });
});

productsRouter.get('/', async (request, response) => {
  const findProducts = new FindProductsService();

  // const { id, name } = request.query;
  const id = request.query.id as string;
  const name = request.query.name as string;

  const products = await findProducts.execute({ id, name });

  return response.json(products);
  // return response.json({ id, name });
});

export default productsRouter;
