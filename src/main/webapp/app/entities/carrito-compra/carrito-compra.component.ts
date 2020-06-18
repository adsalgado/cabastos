import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarritoCompra } from 'app/shared/model/carrito-compra.model';
import { CarritoCompraService } from './carrito-compra.service';
import { CarritoCompraDeleteDialogComponent } from './carrito-compra-delete-dialog.component';

@Component({
  selector: 'jhi-carrito-compra',
  templateUrl: './carrito-compra.component.html',
})
export class CarritoCompraComponent implements OnInit, OnDestroy {
  carritoCompras?: ICarritoCompra[];
  eventSubscriber?: Subscription;

  constructor(
    protected carritoCompraService: CarritoCompraService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.carritoCompraService.query().subscribe((res: HttpResponse<ICarritoCompra[]>) => (this.carritoCompras = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarritoCompras();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarritoCompra): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarritoCompras(): void {
    this.eventSubscriber = this.eventManager.subscribe('carritoCompraListModification', () => this.loadAll());
  }

  delete(carritoCompra: ICarritoCompra): void {
    const modalRef = this.modalService.open(CarritoCompraDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carritoCompra = carritoCompra;
  }
}
