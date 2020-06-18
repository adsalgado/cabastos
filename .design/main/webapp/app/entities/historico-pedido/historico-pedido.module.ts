import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { HistoricoPedidoComponent } from './historico-pedido.component';
import { HistoricoPedidoDetailComponent } from './historico-pedido-detail.component';
import { HistoricoPedidoUpdateComponent } from './historico-pedido-update.component';
import { HistoricoPedidoDeleteDialogComponent } from './historico-pedido-delete-dialog.component';
import { historicoPedidoRoute } from './historico-pedido.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(historicoPedidoRoute)],
  declarations: [
    HistoricoPedidoComponent,
    HistoricoPedidoDetailComponent,
    HistoricoPedidoUpdateComponent,
    HistoricoPedidoDeleteDialogComponent,
  ],
  entryComponents: [HistoricoPedidoDeleteDialogComponent],
})
export class AbastosHistoricoPedidoModule {}
