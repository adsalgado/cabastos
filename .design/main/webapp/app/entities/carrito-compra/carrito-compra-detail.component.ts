import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarritoCompra } from 'app/shared/model/carrito-compra.model';

@Component({
  selector: 'jhi-carrito-compra-detail',
  templateUrl: './carrito-compra-detail.component.html',
})
export class CarritoCompraDetailComponent implements OnInit {
  carritoCompra: ICarritoCompra | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoCompra }) => (this.carritoCompra = carritoCompra));
  }

  previousState(): void {
    window.history.back();
  }
}
