import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInventarioHistorico } from 'app/shared/model/inventario-historico.model';
import { InventarioHistoricoService } from './inventario-historico.service';
import { InventarioHistoricoDeleteDialogComponent } from './inventario-historico-delete-dialog.component';

@Component({
  selector: 'jhi-inventario-historico',
  templateUrl: './inventario-historico.component.html',
})
export class InventarioHistoricoComponent implements OnInit, OnDestroy {
  inventarioHistoricos?: IInventarioHistorico[];
  eventSubscriber?: Subscription;

  constructor(
    protected inventarioHistoricoService: InventarioHistoricoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.inventarioHistoricoService
      .query()
      .subscribe((res: HttpResponse<IInventarioHistorico[]>) => (this.inventarioHistoricos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInventarioHistoricos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInventarioHistorico): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInventarioHistoricos(): void {
    this.eventSubscriber = this.eventManager.subscribe('inventarioHistoricoListModification', () => this.loadAll());
  }

  delete(inventarioHistorico: IInventarioHistorico): void {
    const modalRef = this.modalService.open(InventarioHistoricoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inventarioHistorico = inventarioHistorico;
  }
}
