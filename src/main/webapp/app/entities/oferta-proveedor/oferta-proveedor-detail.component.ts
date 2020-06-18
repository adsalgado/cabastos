import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfertaProveedor } from 'app/shared/model/oferta-proveedor.model';

@Component({
  selector: 'jhi-oferta-proveedor-detail',
  templateUrl: './oferta-proveedor-detail.component.html',
})
export class OfertaProveedorDetailComponent implements OnInit {
  ofertaProveedor: IOfertaProveedor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ofertaProveedor }) => (this.ofertaProveedor = ofertaProveedor));
  }

  previousState(): void {
    window.history.back();
  }
}
