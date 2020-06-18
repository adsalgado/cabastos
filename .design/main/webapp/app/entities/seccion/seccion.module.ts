import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { SeccionComponent } from './seccion.component';
import { SeccionDetailComponent } from './seccion-detail.component';
import { SeccionUpdateComponent } from './seccion-update.component';
import { SeccionDeleteDialogComponent } from './seccion-delete-dialog.component';
import { seccionRoute } from './seccion.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(seccionRoute)],
  declarations: [SeccionComponent, SeccionDetailComponent, SeccionUpdateComponent, SeccionDeleteDialogComponent],
  entryComponents: [SeccionDeleteDialogComponent],
})
export class AbastosSeccionModule {}
