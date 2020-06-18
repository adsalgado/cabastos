import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarritoHistoricoDetalle } from 'app/shared/model/carrito-historico-detalle.model';

@Component({
  selector: 'jhi-carrito-historico-detalle-detail',
  templateUrl: './carrito-historico-detalle-detail.component.html',
})
export class CarritoHistoricoDetalleDetailComponent implements OnInit {
  carritoHistoricoDetalle: ICarritoHistoricoDetalle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoHistoricoDetalle }) => (this.carritoHistoricoDetalle = carritoHistoricoDetalle));
  }

  previousState(): void {
    window.history.back();
  }
}
