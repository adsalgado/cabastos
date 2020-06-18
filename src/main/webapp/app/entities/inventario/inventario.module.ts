import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { InventarioComponent } from './inventario.component';
import { InventarioDetailComponent } from './inventario-detail.component';
import { InventarioUpdateComponent } from './inventario-update.component';
import { InventarioDeleteDialogComponent } from './inventario-delete-dialog.component';
import { inventarioRoute } from './inventario.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(inventarioRoute)],
  declarations: [InventarioComponent, InventarioDetailComponent, InventarioUpdateComponent, InventarioDeleteDialogComponent],
  entryComponents: [InventarioDeleteDialogComponent],
})
export class AbastosInventarioModule {}
