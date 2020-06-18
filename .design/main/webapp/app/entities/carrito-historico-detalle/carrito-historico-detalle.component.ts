import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarritoHistoricoDetalle } from 'app/shared/model/carrito-historico-detalle.model';
import { CarritoHistoricoDetalleService } from './carrito-historico-detalle.service';
import { CarritoHistoricoDetalleDeleteDialogComponent } from './carrito-historico-detalle-delete-dialog.component';

@Component({
  selector: 'jhi-carrito-historico-detalle',
  templateUrl: './carrito-historico-detalle.component.html',
})
export class CarritoHistoricoDetalleComponent implements OnInit, OnDestroy {
  carritoHistoricoDetalles?: ICarritoHistoricoDetalle[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected carritoHistoricoDetalleService: CarritoHistoricoDetalleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.carritoHistoricoDetalleService
      .query()
      .subscribe((res: HttpResponse<ICarritoHistoricoDetalle[]>) => (this.carritoHistoricoDetalles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarritoHistoricoDetalles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarritoHistoricoDetalle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarritoHistoricoDetalles(): void {
    this.eventSubscriber = this.eventManager.subscribe('carritoHistoricoDetalleListModification', () => this.loadAll());
  }

  delete(carritoHistoricoDetalle: ICarritoHistoricoDetalle): void {
    const modalRef = this.modalService.open(CarritoHistoricoDetalleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carritoHistoricoDetalle = carritoHistoricoDetalle;
  }
}
