import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagos } from 'app/shared/model/pagos.model';
import { PagosService } from './pagos.service';
import { PagosDeleteDialogComponent } from './pagos-delete-dialog.component';

@Component({
  selector: 'jhi-pagos',
  templateUrl: './pagos.component.html',
})
export class PagosComponent implements OnInit, OnDestroy {
  pagos?: IPagos[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected pagosService: PagosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.pagosService.query().subscribe((res: HttpResponse<IPagos[]>) => (this.pagos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPagos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPagos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPagos(): void {
    this.eventSubscriber = this.eventManager.subscribe('pagosListModification', () => this.loadAll());
  }

  delete(pagos: IPagos): void {
    const modalRef = this.modalService.open(PagosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pagos = pagos;
  }
}
