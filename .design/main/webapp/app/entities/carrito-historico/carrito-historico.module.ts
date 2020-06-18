import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { CarritoHistoricoComponent } from './carrito-historico.component';
import { CarritoHistoricoDetailComponent } from './carrito-historico-detail.component';
import { CarritoHistoricoUpdateComponent } from './carrito-historico-update.component';
import { CarritoHistoricoDeleteDialogComponent } from './carrito-historico-delete-dialog.component';
import { carritoHistoricoRoute } from './carrito-historico.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(carritoHistoricoRoute)],
  declarations: [
    CarritoHistoricoComponent,
    CarritoHistoricoDetailComponent,
    CarritoHistoricoUpdateComponent,
    CarritoHistoricoDeleteDialogComponent,
  ],
  entryComponents: [CarritoHistoricoDeleteDialogComponent],
})
export class AbastosCarritoHistoricoModule {}
