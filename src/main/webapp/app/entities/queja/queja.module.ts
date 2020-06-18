import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { QuejaComponent } from './queja.component';
import { QuejaDetailComponent } from './queja-detail.component';
import { QuejaUpdateComponent } from './queja-update.component';
import { QuejaDeleteDialogComponent } from './queja-delete-dialog.component';
import { quejaRoute } from './queja.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(quejaRoute)],
  declarations: [QuejaComponent, QuejaDetailComponent, QuejaUpdateComponent, QuejaDeleteDialogComponent],
  entryComponents: [QuejaDeleteDialogComponent],
})
export class AbastosQuejaModule {}
