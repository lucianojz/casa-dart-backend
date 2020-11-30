import { Router } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';

import FindProductsService from '../services/FindProductsService';
import FindProductByIdService from '../services/FindProductByIdService';

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
  await productRepository.save(product);

  const { id } = product;
  return response.json({ id, name, reference, description, value });
});

productsRouter.get('/', async (request, response) => {
  const findProducts = new FindProductsService();

  const name = request.query.name as string;

  const products = await findProducts.execute({ name });

  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const findProductById = new FindProductByIdService();

  const { id } = request.params;

  const product = await findProductById.execute({ id });
  return response.json(product);
});

export default productsRouter;
