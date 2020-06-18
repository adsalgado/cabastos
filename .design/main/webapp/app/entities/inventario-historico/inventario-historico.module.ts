import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { InventarioHistoricoComponent } from './inventario-historico.component';
import { InventarioHistoricoDetailComponent } from './inventario-historico-detail.component';
import { InventarioHistoricoUpdateComponent } from './inventario-historico-update.component';
import { InventarioHistoricoDeleteDialogComponent } from './inventario-historico-delete-dialog.component';
import { inventarioHistoricoRoute } from './inventario-historico.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(inventarioHistoricoRoute)],
  declarations: [
    InventarioHistoricoComponent,
    InventarioHistoricoDetailComponent,
    InventarioHistoricoUpdateComponent,
    InventarioHistoricoDeleteDialogComponent,
  ],
  entryComponents: [InventarioHistoricoDeleteDialogComponent],
})
export class AbastosInventarioHistoricoModule {}
