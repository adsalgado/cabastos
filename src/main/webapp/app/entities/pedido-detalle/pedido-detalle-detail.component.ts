import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPedidoDetalle } from 'app/shared/model/pedido-detalle.model';

@Component({
  selector: 'jhi-pedido-detalle-detail',
  templateUrl: './pedido-detalle-detail.component.html',
})
export class PedidoDetalleDetailComponent implements OnInit {
  pedidoDetalle: IPedidoDetalle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedidoDetalle }) => (this.pedidoDetalle = pedidoDetalle));
  }

  previousState(): void {
    window.history.back();
  }
}
