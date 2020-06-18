import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransportista } from 'app/shared/model/transportista.model';
import { TransportistaService } from './transportista.service';
import { TransportistaDeleteDialogComponent } from './transportista-delete-dialog.component';

@Component({
  selector: 'jhi-transportista',
  templateUrl: './transportista.component.html',
})
export class TransportistaComponent implements OnInit, OnDestroy {
  transportistas?: ITransportista[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected transportistaService: TransportistaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.transportistaService.query().subscribe((res: HttpResponse<ITransportista[]>) => (this.transportistas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransportistas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransportista): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransportistas(): void {
    this.eventSubscriber = this.eventManager.subscribe('transportistaListModification', () => this.loadAll());
  }

  delete(transportista: ITransportista): void {
    const modalRef = this.modalService.open(TransportistaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transportista = transportista;
  }
}
