import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarritoCompra } from 'app/shared/model/carrito-compra.model';
import { CarritoCompraService } from './carrito-compra.service';

@Component({
  templateUrl: './carrito-compra-delete-dialog.component.html',
})
export class CarritoCompraDeleteDialogComponent {
  carritoCompra?: ICarritoCompra;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected carritoCompraService: CarritoCompraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carritoCompraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carritoCompraListModification');
      this.activeModal.close();
    });
  }
}
