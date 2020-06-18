import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { TipoArticuloComponent } from './tipo-articulo.component';
import { TipoArticuloDetailComponent } from './tipo-articulo-detail.component';
import { TipoArticuloUpdateComponent } from './tipo-articulo-update.component';
import { TipoArticuloDeleteDialogComponent } from './tipo-articulo-delete-dialog.component';
import { tipoArticuloRoute } from './tipo-articulo.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(tipoArticuloRoute)],
  declarations: [TipoArticuloComponent, TipoArticuloDetailComponent, TipoArticuloUpdateComponent, TipoArticuloDeleteDialogComponent],
  entryComponents: [TipoArticuloDeleteDialogComponent],
})
export class AbastosTipoArticuloModule {}
