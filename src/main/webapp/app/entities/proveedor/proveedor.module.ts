import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { ProveedorComponent } from './proveedor.component';
import { ProveedorDetailComponent } from './proveedor-detail.component';
import { ProveedorUpdateComponent } from './proveedor-update.component';
import { ProveedorDeleteDialogComponent } from './proveedor-delete-dialog.component';
import { proveedorRoute } from './proveedor.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(proveedorRoute)],
  declarations: [ProveedorComponent, ProveedorDetailComponent, ProveedorUpdateComponent, ProveedorDeleteDialogComponent],
  entryComponents: [ProveedorDeleteDialogComponent],
})
export class AbastosProveedorModule {}
