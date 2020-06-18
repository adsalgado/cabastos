import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { PagosComponent } from './pagos.component';
import { PagosDetailComponent } from './pagos-detail.component';
import { PagosUpdateComponent } from './pagos-update.component';
import { PagosDeleteDialogComponent } from './pagos-delete-dialog.component';
import { pagosRoute } from './pagos.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(pagosRoute)],
  declarations: [PagosComponent, PagosDetailComponent, PagosUpdateComponent, PagosDeleteDialogComponent],
  entryComponents: [PagosDeleteDialogComponent],
})
export class AbastosPagosModule {}
