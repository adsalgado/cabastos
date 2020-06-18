import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDireccion } from 'app/shared/model/direccion.model';
import { DireccionService } from './direccion.service';
import { DireccionDeleteDialogComponent } from './direccion-delete-dialog.component';

@Component({
  selector: 'jhi-direccion',
  templateUrl: './direccion.component.html',
})
export class DireccionComponent implements OnInit, OnDestroy {
  direccions?: IDireccion[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected direccionService: DireccionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.direccionService.query().subscribe((res: HttpResponse<IDireccion[]>) => (this.direccions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDireccions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDireccion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDireccions(): void {
    this.eventSubscriber = this.eventManager.subscribe('direccionListModification', () => this.loadAll());
  }

  delete(direccion: IDireccion): void {
    const modalRef = this.modalService.open(DireccionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.direccion = direccion;
  }
}
