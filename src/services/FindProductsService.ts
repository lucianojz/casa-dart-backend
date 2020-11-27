import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
  name: string;
}

class FindProductsService {
  public async execute({ name }: Request): Promise<Product[]> {
    const productRepository = getRepository(Product);

    let products = [] as Product[];

    if (name && name !== '') {
      products = await productRepository
        .createQueryBuilder()
        .select(
          ` id,
            name,
            description,
            reference,
            image_url,
            value,
            freight_charge,
            promo_value`,
        )
        .where(`(UPPER(name) like UPPER('%${name}%'))`)
        .execute();
      return products;
    }

    products = await productRepository.find();
    return products;
  }
}

export default FindProductsService;
