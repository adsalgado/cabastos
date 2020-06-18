import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInventarioHistorico } from 'app/shared/model/inventario-historico.model';
import { InventarioHistoricoService } from './inventario-historico.service';

@Component({
  templateUrl: './inventario-historico-delete-dialog.component.html',
})
export class InventarioHistoricoDeleteDialogComponent {
  inventarioHistorico?: IInventarioHistorico;

  constructor(
    protected inventarioHistoricoService: InventarioHistoricoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inventarioHistoricoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inventarioHistoricoListModification');
      this.activeModal.close();
    });
  }
}
