import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
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

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected historicoPedidoService: HistoricoPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

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
