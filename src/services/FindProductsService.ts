import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
  id: string;
  name: string;
}

class FindProductsService {
  public async execute({ id, name }: Request): Promise<Product[]> {
    const productRepository = getRepository(Product);

    let products = [] as Product[];
    if (id && id !== '') {
      products = await productRepository.find({ where: { id } });
      return products;
    }

    if (name && name !== '') {
      products = await productRepository
        .createQueryBuilder()
        .select(
          ` products.id,
            products.name,
            products.description,
            products.reference,
            products.image_url,
            products.value,
            products.freight_charge,
            products.promo_value`,
        )
        .from(Product, 'products')
        .where(`(UPPER(products.name) like UPPER('%${name}%'))`)
        .execute();
      return products;
    }

    products = await productRepository.find();
    return products;
  }
}

export default FindProductsService;
