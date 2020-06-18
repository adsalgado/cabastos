import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { CarritoHistoricoDetalleComponent } from './carrito-historico-detalle.component';
import { CarritoHistoricoDetalleDetailComponent } from './carrito-historico-detalle-detail.component';
import { CarritoHistoricoDetalleUpdateComponent } from './carrito-historico-detalle-update.component';
import { CarritoHistoricoDetalleDeleteDialogComponent } from './carrito-historico-detalle-delete-dialog.component';
import { carritoHistoricoDetalleRoute } from './carrito-historico-detalle.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(carritoHistoricoDetalleRoute)],
  declarations: [
    CarritoHistoricoDetalleComponent,
    CarritoHistoricoDetalleDetailComponent,
    CarritoHistoricoDetalleUpdateComponent,
    CarritoHistoricoDetalleDeleteDialogComponent,
  ],
  entryComponents: [CarritoHistoricoDetalleDeleteDialogComponent],
})
export class AbastosCarritoHistoricoDetalleModule {}
