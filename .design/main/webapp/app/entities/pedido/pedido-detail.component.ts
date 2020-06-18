import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPedido } from 'app/shared/model/pedido.model';

@Component({
  selector: 'jhi-pedido-detail',
  templateUrl: './pedido-detail.component.html',
})
export class PedidoDetailComponent implements OnInit {
  pedido: IPedido | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedido }) => (this.pedido = pedido));
  }

  previousState(): void {
    window.history.back();
  }
}
