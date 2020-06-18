import { IProducto } from 'app/shared/model/producto.model';
import { IOfertaProveedor } from 'app/shared/model/oferta-proveedor.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IPedido } from 'app/shared/model/pedido.model';
import { IPedidoDetalle } from 'app/shared/model/pedido-detalle.model';
import { TipoEstatus } from 'app/shared/model/enumerations/tipo-estatus.model';

export interface IEstatus {
  id?: number;
  tipoEstatus?: TipoEstatus;
  nombre?: string;
  productos?: IProducto[];
  ofertaProveedors?: IOfertaProveedor[];
  clientes?: ICliente[];
  pedidos?: IPedido[];
  pedidoDetalles?: IPedidoDetalle[];
}

export class Estatus implements IEstatus {
  constructor(
    public id?: number,
    public tipoEstatus?: TipoEstatus,
    public nombre?: string,
    public productos?: IProducto[],
    public ofertaProveedors?: IOfertaProveedor[],
    public clientes?: ICliente[],
    public pedidos?: IPedido[],
    public pedidoDetalles?: IPedidoDetalle[]
  ) {}
}
