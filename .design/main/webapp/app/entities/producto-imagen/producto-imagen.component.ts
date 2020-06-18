import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductoImagen } from 'app/shared/model/producto-imagen.model';
import { ProductoImagenService } from './producto-imagen.service';
import { ProductoImagenDeleteDialogComponent } from './producto-imagen-delete-dialog.component';

@Component({
  selector: 'jhi-producto-imagen',
  templateUrl: './producto-imagen.component.html',
})
export class ProductoImagenComponent implements OnInit, OnDestroy {
  productoImagens?: IProductoImagen[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected productoImagenService: ProductoImagenService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.productoImagenService.query().subscribe((res: HttpResponse<IProductoImagen[]>) => (this.productoImagens = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductoImagens();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductoImagen): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductoImagens(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoImagenListModification', () => this.loadAll());
  }

  delete(productoImagen: IProductoImagen): void {
    const modalRef = this.modalService.open(ProductoImagenDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productoImagen = productoImagen;
  }
}
