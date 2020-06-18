import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { PedidoDetalleComponent } from './pedido-detalle.component';
import { PedidoDetalleDetailComponent } from './pedido-detalle-detail.component';
import { PedidoDetalleUpdateComponent } from './pedido-detalle-update.component';
import { PedidoDetalleDeleteDialogComponent } from './pedido-detalle-delete-dialog.component';
import { pedidoDetalleRoute } from './pedido-detalle.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(pedidoDetalleRoute)],
  declarations: [PedidoDetalleComponent, PedidoDetalleDetailComponent, PedidoDetalleUpdateComponent, PedidoDetalleDeleteDialogComponent],
  entryComponents: [PedidoDetalleDeleteDialogComponent],
})
export class AbastosPedidoDetalleModule {}
