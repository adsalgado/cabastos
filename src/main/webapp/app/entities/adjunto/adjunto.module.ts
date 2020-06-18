import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { AdjuntoComponent } from './adjunto.component';
import { AdjuntoDetailComponent } from './adjunto-detail.component';
import { AdjuntoUpdateComponent } from './adjunto-update.component';
import { AdjuntoDeleteDialogComponent } from './adjunto-delete-dialog.component';
import { adjuntoRoute } from './adjunto.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(adjuntoRoute)],
  declarations: [AdjuntoComponent, AdjuntoDetailComponent, AdjuntoUpdateComponent, AdjuntoDeleteDialogComponent],
  entryComponents: [AdjuntoDeleteDialogComponent],
})
export class AbastosAdjuntoModule {}
