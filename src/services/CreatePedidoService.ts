import Pedido from '../models/Pedido';
import PedidosRepository from '../repositories/PedidosRepository';

interface Request {
  cliente: string;
  produto: string;
}

class CreatePedidoService {
  private pedidosRepository: PedidosRepository;

  constructor(pedidosRepository: PedidosRepository) {
    this.pedidosRepository = pedidosRepository;
  }

  public execute({ cliente, produto }: Request): Pedido {
    if (!cliente) {
      throw Error('Cliente inválido!');
    }

    const pedido = this.pedidosRepository.create({ cliente, produto });

    return pedido;
  }
}

export default CreatePedidoService;
