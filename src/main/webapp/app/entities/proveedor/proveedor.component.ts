import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from './proveedor.service';
import { ProveedorDeleteDialogComponent } from './proveedor-delete-dialog.component';

@Component({
  selector: 'jhi-proveedor',
  templateUrl: './proveedor.component.html',
})
export class ProveedorComponent implements OnInit, OnDestroy {
  proveedors?: IProveedor[];
  eventSubscriber?: Subscription;

  constructor(protected proveedorService: ProveedorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.proveedorService.query().subscribe((res: HttpResponse<IProveedor[]>) => (this.proveedors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProveedors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProveedor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProveedors(): void {
    this.eventSubscriber = this.eventManager.subscribe('proveedorListModification', () => this.loadAll());
  }

  delete(proveedor: IProveedor): void {
    const modalRef = this.modalService.open(ProveedorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proveedor = proveedor;
  }
}
