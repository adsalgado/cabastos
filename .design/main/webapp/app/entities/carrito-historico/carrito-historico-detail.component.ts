import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarritoHistorico } from 'app/shared/model/carrito-historico.model';

@Component({
  selector: 'jhi-carrito-historico-detail',
  templateUrl: './carrito-historico-detail.component.html',
})
export class CarritoHistoricoDetailComponent implements OnInit {
  carritoHistorico: ICarritoHistorico | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoHistorico }) => (this.carritoHistorico = carritoHistorico));
  }

  previousState(): void {
    window.history.back();
  }
}
