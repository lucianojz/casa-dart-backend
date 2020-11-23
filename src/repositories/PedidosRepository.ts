import Pedido from '../models/Pedido';

interface CreatePedidoDTO {
  cliente: string;
  produto: string;
}

class PedidosRepository {
  private pedidos: Pedido[];

  constructor() {
    this.pedidos = [];
  }

  public create({ cliente, produto }: CreatePedidoDTO): Pedido {
    const pedido = new Pedido({ cliente, produto });

    this.pedidos.push(pedido);
    return pedido;
  }

  public all(): Pedido[] {
    return this.pedidos;
  }
}

export default PedidosRepository;
