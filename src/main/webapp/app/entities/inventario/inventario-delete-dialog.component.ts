import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInventario } from 'app/shared/model/inventario.model';
import { InventarioService } from './inventario.service';

@Component({
  templateUrl: './inventario-delete-dialog.component.html',
})
export class InventarioDeleteDialogComponent {
  inventario?: IInventario;

  constructor(
    protected inventarioService: InventarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inventarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inventarioListModification');
      this.activeModal.close();
    });
  }
}
