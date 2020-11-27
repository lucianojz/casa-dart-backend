import { getRepository } from 'typeorm';
import Product from '../models/Product';

interface Request {
  id: string;
}

class FindProductByIdService {
  public async execute({ id }: Request): Promise<Product | undefined> {
    const productRepository = getRepository(Product);

    const uuidV4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    );

    if (id.match(uuidV4)) {
      const product = await productRepository.findOne({ where: { id } });

      return product;
    }
    return {} as Product;
  }
}

export default FindProductByIdService;
