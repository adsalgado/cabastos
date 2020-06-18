import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { OfertaProveedorComponent } from './oferta-proveedor.component';
import { OfertaProveedorDetailComponent } from './oferta-proveedor-detail.component';
import { OfertaProveedorUpdateComponent } from './oferta-proveedor-update.component';
import { OfertaProveedorDeleteDialogComponent } from './oferta-proveedor-delete-dialog.component';
import { ofertaProveedorRoute } from './oferta-proveedor.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(ofertaProveedorRoute)],
  declarations: [
    OfertaProveedorComponent,
    OfertaProveedorDetailComponent,
    OfertaProveedorUpdateComponent,
    OfertaProveedorDeleteDialogComponent,
  ],
  entryComponents: [OfertaProveedorDeleteDialogComponent],
})
export class AbastosOfertaProveedorModule {}
