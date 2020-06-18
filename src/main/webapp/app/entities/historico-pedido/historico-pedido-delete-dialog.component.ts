import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoricoPedido } from 'app/shared/model/historico-pedido.model';
import { HistoricoPedidoService } from './historico-pedido.service';

@Component({
  templateUrl: './historico-pedido-delete-dialog.component.html',
})
export class HistoricoPedidoDeleteDialogComponent {
  historicoPedido?: IHistoricoPedido;

  constructor(
    protected historicoPedidoService: HistoricoPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historicoPedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historicoPedidoListModification');
      this.activeModal.close();
    });
  }
}
