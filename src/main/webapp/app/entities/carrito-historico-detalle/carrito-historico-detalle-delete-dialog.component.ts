import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarritoHistoricoDetalle } from 'app/shared/model/carrito-historico-detalle.model';
import { CarritoHistoricoDetalleService } from './carrito-historico-detalle.service';

@Component({
  templateUrl: './carrito-historico-detalle-delete-dialog.component.html',
})
export class CarritoHistoricoDetalleDeleteDialogComponent {
  carritoHistoricoDetalle?: ICarritoHistoricoDetalle;

  constructor(
    protected carritoHistoricoDetalleService: CarritoHistoricoDetalleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carritoHistoricoDetalleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carritoHistoricoDetalleListModification');
      this.activeModal.close();
    });
  }
}
