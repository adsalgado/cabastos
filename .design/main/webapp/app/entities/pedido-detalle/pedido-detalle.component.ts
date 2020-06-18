import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPedidoDetalle } from 'app/shared/model/pedido-detalle.model';
import { PedidoDetalleService } from './pedido-detalle.service';
import { PedidoDetalleDeleteDialogComponent } from './pedido-detalle-delete-dialog.component';

@Component({
  selector: 'jhi-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
})
export class PedidoDetalleComponent implements OnInit, OnDestroy {
  pedidoDetalles?: IPedidoDetalle[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected pedidoDetalleService: PedidoDetalleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.pedidoDetalleService.query().subscribe((res: HttpResponse<IPedidoDetalle[]>) => (this.pedidoDetalles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPedidoDetalles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPedidoDetalle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPedidoDetalles(): void {
    this.eventSubscriber = this.eventManager.subscribe('pedidoDetalleListModification', () => this.loadAll());
  }

  delete(pedidoDetalle: IPedidoDetalle): void {
    const modalRef = this.modalService.open(PedidoDetalleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pedidoDetalle = pedidoDetalle;
  }
}
