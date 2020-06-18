import { Moment } from 'moment';
import { TipoMovimiento } from 'app/shared/model/enumerations/tipo-movimiento.model';

export interface IInventarioHistorico {
  id?: number;
  tipoMovimiento?: TipoMovimiento;
  cantidad?: number;
  totalAnterior?: number;
  totalFinal?: number;
  fechaMovimiento?: Moment;
  usuarioMovimientoId?: number;
  inventarioId?: number;
}

export class InventarioHistorico implements IInventarioHistorico {
  constructor(
    public id?: number,
    public tipoMovimiento?: TipoMovimiento,
    public cantidad?: number,
    public totalAnterior?: number,
    public totalFinal?: number,
    public fechaMovimiento?: Moment,
    public usuarioMovimientoId?: number,
    public inventarioId?: number
  ) {}
}
