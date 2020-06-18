import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { EstatusComponent } from './estatus.component';
import { EstatusDetailComponent } from './estatus-detail.component';
import { EstatusUpdateComponent } from './estatus-update.component';
import { EstatusDeleteDialogComponent } from './estatus-delete-dialog.component';
import { estatusRoute } from './estatus.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(estatusRoute)],
  declarations: [EstatusComponent, EstatusDetailComponent, EstatusUpdateComponent, EstatusDeleteDialogComponent],
  entryComponents: [EstatusDeleteDialogComponent],
})
export class AbastosEstatusModule {}
