import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { ParametrosAplicacionComponent } from './parametros-aplicacion.component';
import { ParametrosAplicacionDetailComponent } from './parametros-aplicacion-detail.component';
import { ParametrosAplicacionUpdateComponent } from './parametros-aplicacion-update.component';
import { ParametrosAplicacionDeleteDialogComponent } from './parametros-aplicacion-delete-dialog.component';
import { parametrosAplicacionRoute } from './parametros-aplicacion.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(parametrosAplicacionRoute)],
  declarations: [
    ParametrosAplicacionComponent,
    ParametrosAplicacionDetailComponent,
    ParametrosAplicacionUpdateComponent,
    ParametrosAplicacionDeleteDialogComponent,
  ],
  entryComponents: [ParametrosAplicacionDeleteDialogComponent],
})
export class AbastosParametrosAplicacionModule {}
