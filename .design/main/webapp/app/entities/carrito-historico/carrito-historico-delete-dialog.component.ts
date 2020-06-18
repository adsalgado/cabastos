import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarritoHistorico } from 'app/shared/model/carrito-historico.model';
import { CarritoHistoricoService } from './carrito-historico.service';

@Component({
  templateUrl: './carrito-historico-delete-dialog.component.html',
})
export class CarritoHistoricoDeleteDialogComponent {
  carritoHistorico?: ICarritoHistorico;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected carritoHistoricoService: CarritoHistoricoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carritoHistoricoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carritoHistoricoListModification');
      this.activeModal.close();
    });
  }
}
