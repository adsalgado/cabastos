import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOfertaProveedor } from 'app/shared/model/oferta-proveedor.model';
import { OfertaProveedorService } from './oferta-proveedor.service';
import { OfertaProveedorDeleteDialogComponent } from './oferta-proveedor-delete-dialog.component';

@Component({
  selector: 'jhi-oferta-proveedor',
  templateUrl: './oferta-proveedor.component.html',
})
export class OfertaProveedorComponent implements OnInit, OnDestroy {
  ofertaProveedors?: IOfertaProveedor[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected ofertaProveedorService: OfertaProveedorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.ofertaProveedorService.query().subscribe((res: HttpResponse<IOfertaProveedor[]>) => (this.ofertaProveedors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOfertaProveedors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOfertaProveedor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOfertaProveedors(): void {
    this.eventSubscriber = this.eventManager.subscribe('ofertaProveedorListModification', () => this.loadAll());
  }

  delete(ofertaProveedor: IOfertaProveedor): void {
    const modalRef = this.modalService.open(OfertaProveedorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ofertaProveedor = ofertaProveedor;
  }
}
