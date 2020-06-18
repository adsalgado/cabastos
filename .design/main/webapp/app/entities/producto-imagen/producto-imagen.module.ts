import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { ProductoImagenComponent } from './producto-imagen.component';
import { ProductoImagenDetailComponent } from './producto-imagen-detail.component';
import { ProductoImagenUpdateComponent } from './producto-imagen-update.component';
import { ProductoImagenDeleteDialogComponent } from './producto-imagen-delete-dialog.component';
import { productoImagenRoute } from './producto-imagen.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(productoImagenRoute)],
  declarations: [
    ProductoImagenComponent,
    ProductoImagenDetailComponent,
    ProductoImagenUpdateComponent,
    ProductoImagenDeleteDialogComponent,
  ],
  entryComponents: [ProductoImagenDeleteDialogComponent],
})
export class AbastosProductoImagenModule {}
