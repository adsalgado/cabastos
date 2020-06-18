import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from './producto.service';
import { ProductoDeleteDialogComponent } from './producto-delete-dialog.component';

@Component({
  selector: 'jhi-producto',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit, OnDestroy {
  productos?: IProducto[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected productoService: ProductoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProducto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductos(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoListModification', () => this.loadAll());
  }

  delete(producto: IProducto): void {
    const modalRef = this.modalService.open(ProductoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.producto = producto;
  }
}
