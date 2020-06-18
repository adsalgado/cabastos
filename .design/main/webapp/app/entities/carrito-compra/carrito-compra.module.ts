import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { CarritoCompraComponent } from './carrito-compra.component';
import { CarritoCompraDetailComponent } from './carrito-compra-detail.component';
import { CarritoCompraUpdateComponent } from './carrito-compra-update.component';
import { CarritoCompraDeleteDialogComponent } from './carrito-compra-delete-dialog.component';
import { carritoCompraRoute } from './carrito-compra.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(carritoCompraRoute)],
  declarations: [CarritoCompraComponent, CarritoCompraDetailComponent, CarritoCompraUpdateComponent, CarritoCompraDeleteDialogComponent],
  entryComponents: [CarritoCompraDeleteDialogComponent],
})
export class AbastosCarritoCompraModule {}
