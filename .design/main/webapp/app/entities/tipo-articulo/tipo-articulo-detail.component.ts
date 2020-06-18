import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoArticulo } from 'app/shared/model/tipo-articulo.model';

@Component({
  selector: 'jhi-tipo-articulo-detail',
  templateUrl: './tipo-articulo-detail.component.html',
})
export class TipoArticuloDetailComponent implements OnInit {
  tipoArticulo: ITipoArticulo | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoArticulo }) => (this.tipoArticulo = tipoArticulo));
  }

  previousState(): void {
    window.history.back();
  }
}
