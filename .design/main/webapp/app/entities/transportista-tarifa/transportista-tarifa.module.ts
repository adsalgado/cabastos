import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { TransportistaTarifaComponent } from './transportista-tarifa.component';
import { TransportistaTarifaDetailComponent } from './transportista-tarifa-detail.component';
import { TransportistaTarifaUpdateComponent } from './transportista-tarifa-update.component';
import { TransportistaTarifaDeleteDialogComponent } from './transportista-tarifa-delete-dialog.component';
import { transportistaTarifaRoute } from './transportista-tarifa.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(transportistaTarifaRoute)],
  declarations: [
    TransportistaTarifaComponent,
    TransportistaTarifaDetailComponent,
    TransportistaTarifaUpdateComponent,
    TransportistaTarifaDeleteDialogComponent,
  ],
  entryComponents: [TransportistaTarifaDeleteDialogComponent],
})
export class AbastosTransportistaTarifaModule {}
