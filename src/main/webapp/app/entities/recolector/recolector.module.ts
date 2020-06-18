import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { RecolectorComponent } from './recolector.component';
import { RecolectorDetailComponent } from './recolector-detail.component';
import { RecolectorUpdateComponent } from './recolector-update.component';
import { RecolectorDeleteDialogComponent } from './recolector-delete-dialog.component';
import { recolectorRoute } from './recolector.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(recolectorRoute)],
  declarations: [RecolectorComponent, RecolectorDetailComponent, RecolectorUpdateComponent, RecolectorDeleteDialogComponent],
  entryComponents: [RecolectorDeleteDialogComponent],
})
export class AbastosRecolectorModule {}
