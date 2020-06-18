import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbastosSharedModule } from 'app/shared/shared.module';
import { UsuarioImagenComponent } from './usuario-imagen.component';
import { UsuarioImagenDetailComponent } from './usuario-imagen-detail.component';
import { UsuarioImagenUpdateComponent } from './usuario-imagen-update.component';
import { UsuarioImagenDeleteDialogComponent } from './usuario-imagen-delete-dialog.component';
import { usuarioImagenRoute } from './usuario-imagen.route';

@NgModule({
  imports: [AbastosSharedModule, RouterModule.forChild(usuarioImagenRoute)],
  declarations: [UsuarioImagenComponent, UsuarioImagenDetailComponent, UsuarioImagenUpdateComponent, UsuarioImagenDeleteDialogComponent],
  entryComponents: [UsuarioImagenDeleteDialogComponent],
})
export class AbastosUsuarioImagenModule {}
