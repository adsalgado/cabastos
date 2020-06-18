import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { TipoOfertaComponent } from './tipo-oferta.component';
import { TipoOfertaDetailComponent } from './tipo-oferta-detail.component';
import { TipoOfertaUpdateComponent } from './tipo-oferta-update.component';
import { TipoOfertaDeleteDialogComponent } from './tipo-oferta-delete-dialog.component';
import { tipoOfertaRoute } from './tipo-oferta.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(tipoOfertaRoute)],
  declarations: [TipoOfertaComponent, TipoOfertaDetailComponent, TipoOfertaUpdateComponent, TipoOfertaDeleteDialogComponent],
  entryComponents: [TipoOfertaDeleteDialogComponent],
})
export class AbastosTipoOfertaModule {}
