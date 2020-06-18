import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from './adjunto.service';
import { AdjuntoDeleteDialogComponent } from './adjunto-delete-dialog.component';

@Component({
  selector: 'jhi-adjunto',
  templateUrl: './adjunto.component.html',
})
export class AdjuntoComponent implements OnInit, OnDestroy {
  adjuntos?: IAdjunto[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected adjuntoService: AdjuntoService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.adjuntoService.query().subscribe((res: HttpResponse<IAdjunto[]>) => (this.adjuntos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAdjuntos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAdjunto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInAdjuntos(): void {
    this.eventSubscriber = this.eventManager.subscribe('adjuntoListModification', () => this.loadAll());
  }

  delete(adjunto: IAdjunto): void {
    const modalRef = this.modalService.open(AdjuntoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.adjunto = adjunto;
  }
}
