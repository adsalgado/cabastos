import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQueja } from 'app/shared/model/queja.model';
import { QuejaService } from './queja.service';
import { QuejaDeleteDialogComponent } from './queja-delete-dialog.component';

@Component({
  selector: 'jhi-queja',
  templateUrl: './queja.component.html',
})
export class QuejaComponent implements OnInit, OnDestroy {
  quejas?: IQueja[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected quejaService: QuejaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.quejaService.query().subscribe((res: HttpResponse<IQueja[]>) => (this.quejas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQuejas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQueja): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQuejas(): void {
    this.eventSubscriber = this.eventManager.subscribe('quejaListModification', () => this.loadAll());
  }

  delete(queja: IQueja): void {
    const modalRef = this.modalService.open(QuejaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.queja = queja;
  }
}
