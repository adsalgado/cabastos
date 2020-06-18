import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarritoHistorico } from 'app/shared/model/carrito-historico.model';

@Component({
  selector: 'jhi-carrito-historico-detail',
  templateUrl: './carrito-historico-detail.component.html',
})
export class CarritoHistoricoDetailComponent implements OnInit {
  carritoHistorico: ICarritoHistorico | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoHistorico }) => (this.carritoHistorico = carritoHistorico));
  }

  previousState(): void {
    window.history.back();
  }
}
