import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarritoHistorico } from 'app/shared/model/carrito-historico.model';
import { CarritoHistoricoService } from './carrito-historico.service';
import { CarritoHistoricoDeleteDialogComponent } from './carrito-historico-delete-dialog.component';

@Component({
  selector: 'jhi-carrito-historico',
  templateUrl: './carrito-historico.component.html',
})
export class CarritoHistoricoComponent implements OnInit, OnDestroy {
  carritoHistoricos?: ICarritoHistorico[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected carritoHistoricoService: CarritoHistoricoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.carritoHistoricoService.query().subscribe((res: HttpResponse<ICarritoHistorico[]>) => (this.carritoHistoricos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarritoHistoricos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarritoHistorico): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarritoHistoricos(): void {
    this.eventSubscriber = this.eventManager.subscribe('carritoHistoricoListModification', () => this.loadAll());
  }

  delete(carritoHistorico: ICarritoHistorico): void {
    const modalRef = this.modalService.open(CarritoHistoricoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carritoHistorico = carritoHistorico;
  }
}
