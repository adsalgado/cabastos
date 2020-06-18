import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPedidoDetalle } from 'app/shared/model/pedido-detalle.model';
import { PedidoDetalleService } from './pedido-detalle.service';

@Component({
  templateUrl: './pedido-detalle-delete-dialog.component.html',
})
export class PedidoDetalleDeleteDialogComponent {
  pedidoDetalle?: IPedidoDetalle;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected pedidoDetalleService: PedidoDetalleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pedidoDetalleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pedidoDetalleListModification');
      this.activeModal.close();
    });
  }
}
