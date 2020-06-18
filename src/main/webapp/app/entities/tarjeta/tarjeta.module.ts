import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { TarjetaComponent } from './tarjeta.component';
import { TarjetaDetailComponent } from './tarjeta-detail.component';
import { TarjetaUpdateComponent } from './tarjeta-update.component';
import { TarjetaDeleteDialogComponent } from './tarjeta-delete-dialog.component';
import { tarjetaRoute } from './tarjeta.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(tarjetaRoute)],
  declarations: [TarjetaComponent, TarjetaDetailComponent, TarjetaUpdateComponent, TarjetaDeleteDialogComponent],
  entryComponents: [TarjetaDeleteDialogComponent],
})
export class AbastosTarjetaModule {}
