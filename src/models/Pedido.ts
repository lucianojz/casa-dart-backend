import { v4 as uuid } from 'uuid';

class Pedido {
  id: string;

  cliente: string;

  dataEmissao: Date;

  produto: string;

  constructor({ cliente, produto }: Omit<Pedido, 'id' | 'dataEmissao'>) {
    this.id = uuid();
    this.cliente = cliente;
    this.produto = produto;
    this.dataEmissao = new Date();
  }
}

export default Pedido;
