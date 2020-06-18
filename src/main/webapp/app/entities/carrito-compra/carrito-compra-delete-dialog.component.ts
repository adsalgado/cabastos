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

  constructor(
    protected carritoCompraService: CarritoCompraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

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
