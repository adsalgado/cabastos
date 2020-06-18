import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { TransportistaComponent } from './transportista.component';
import { TransportistaDetailComponent } from './transportista-detail.component';
import { TransportistaUpdateComponent } from './transportista-update.component';
import { TransportistaDeleteDialogComponent } from './transportista-delete-dialog.component';
import { transportistaRoute } from './transportista.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(transportistaRoute)],
  declarations: [TransportistaComponent, TransportistaDetailComponent, TransportistaUpdateComponent, TransportistaDeleteDialogComponent],
  entryComponents: [TransportistaDeleteDialogComponent],
})
export class AbastosTransportistaModule {}
