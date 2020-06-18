import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoricoPedido } from 'app/shared/model/historico-pedido.model';
import { HistoricoPedidoService } from './historico-pedido.service';
import { HistoricoPedidoDeleteDialogComponent } from './historico-pedido-delete-dialog.component';

@Component({
  selector: 'jhi-historico-pedido',
  templateUrl: './historico-pedido.component.html',
})
export class HistoricoPedidoComponent implements OnInit, OnDestroy {
  historicoPedidos?: IHistoricoPedido[];
  eventSubscriber?: Subscription;

  constructor(
    protected historicoPedidoService: HistoricoPedidoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.historicoPedidoService.query().subscribe((res: HttpResponse<IHistoricoPedido[]>) => (this.historicoPedidos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoricoPedidos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoricoPedido): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoricoPedidos(): void {
    this.eventSubscriber = this.eventManager.subscribe('historicoPedidoListModification', () => this.loadAll());
  }

  delete(historicoPedido: IHistoricoPedido): void {
    const modalRef = this.modalService.open(HistoricoPedidoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historicoPedido = historicoPedido;
  }
}
