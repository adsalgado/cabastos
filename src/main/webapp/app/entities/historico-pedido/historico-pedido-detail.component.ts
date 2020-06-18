import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoricoPedido } from 'app/shared/model/historico-pedido.model';

@Component({
  selector: 'jhi-historico-pedido-detail',
  templateUrl: './historico-pedido-detail.component.html',
})
export class HistoricoPedidoDetailComponent implements OnInit {
  historicoPedido: IHistoricoPedido | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historicoPedido }) => (this.historicoPedido = historicoPedido));
  }

  previousState(): void {
    window.history.back();
  }
}
