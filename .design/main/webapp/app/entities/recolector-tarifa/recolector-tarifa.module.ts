import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { RecolectorTarifaComponent } from './recolector-tarifa.component';
import { RecolectorTarifaDetailComponent } from './recolector-tarifa-detail.component';
import { RecolectorTarifaUpdateComponent } from './recolector-tarifa-update.component';
import { RecolectorTarifaDeleteDialogComponent } from './recolector-tarifa-delete-dialog.component';
import { recolectorTarifaRoute } from './recolector-tarifa.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(recolectorTarifaRoute)],
  declarations: [
    RecolectorTarifaComponent,
    RecolectorTarifaDetailComponent,
    RecolectorTarifaUpdateComponent,
    RecolectorTarifaDeleteDialogComponent,
  ],
  entryComponents: [RecolectorTarifaDeleteDialogComponent],
})
export class AbastosRecolectorTarifaModule {}
