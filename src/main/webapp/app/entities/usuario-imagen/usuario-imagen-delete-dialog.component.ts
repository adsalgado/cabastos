import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarioImagen } from 'app/shared/model/usuario-imagen.model';
import { UsuarioImagenService } from './usuario-imagen.service';

@Component({
  templateUrl: './usuario-imagen-delete-dialog.component.html',
})
export class UsuarioImagenDeleteDialogComponent {
  usuarioImagen?: IUsuarioImagen;

  constructor(
    protected usuarioImagenService: UsuarioImagenService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuarioImagenService.delete(id).subscribe(() => {
      this.eventManager.broadcast('usuarioImagenListModification');
      this.activeModal.close();
    });
  }
}
