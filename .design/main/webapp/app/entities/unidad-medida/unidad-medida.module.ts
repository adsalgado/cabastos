import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { UnidadMedidaComponent } from './unidad-medida.component';
import { UnidadMedidaDetailComponent } from './unidad-medida-detail.component';
import { UnidadMedidaUpdateComponent } from './unidad-medida-update.component';
import { UnidadMedidaDeleteDialogComponent } from './unidad-medida-delete-dialog.component';
import { unidadMedidaRoute } from './unidad-medida.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(unidadMedidaRoute)],
  declarations: [UnidadMedidaComponent, UnidadMedidaDetailComponent, UnidadMedidaUpdateComponent, UnidadMedidaDeleteDialogComponent],
  entryComponents: [UnidadMedidaDeleteDialogComponent],
})
export class AbastosUnidadMedidaModule {}
