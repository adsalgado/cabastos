import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransportistaTarifa } from 'app/shared/model/transportista-tarifa.model';
import { TransportistaTarifaService } from './transportista-tarifa.service';
import { TransportistaTarifaDeleteDialogComponent } from './transportista-tarifa-delete-dialog.component';

@Component({
  selector: 'jhi-transportista-tarifa',
  templateUrl: './transportista-tarifa.component.html',
})
export class TransportistaTarifaComponent implements OnInit, OnDestroy {
  transportistaTarifas?: ITransportistaTarifa[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected transportistaTarifaService: TransportistaTarifaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.transportistaTarifaService
      .query()
      .subscribe((res: HttpResponse<ITransportistaTarifa[]>) => (this.transportistaTarifas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransportistaTarifas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransportistaTarifa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransportistaTarifas(): void {
    this.eventSubscriber = this.eventManager.subscribe('transportistaTarifaListModification', () => this.loadAll());
  }

  delete(transportistaTarifa: ITransportistaTarifa): void {
    const modalRef = this.modalService.open(TransportistaTarifaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transportistaTarifa = transportistaTarifa;
  }
}
