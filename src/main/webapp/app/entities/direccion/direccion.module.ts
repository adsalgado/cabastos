import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { DireccionComponent } from './direccion.component';
import { DireccionDetailComponent } from './direccion-detail.component';
import { DireccionUpdateComponent } from './direccion-update.component';
import { DireccionDeleteDialogComponent } from './direccion-delete-dialog.component';
import { direccionRoute } from './direccion.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(direccionRoute)],
  declarations: [DireccionComponent, DireccionDetailComponent, DireccionUpdateComponent, DireccionDeleteDialogComponent],
  entryComponents: [DireccionDeleteDialogComponent],
})
export class AbastosDireccionModule {}
