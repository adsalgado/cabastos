import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoOferta } from 'app/shared/model/tipo-oferta.model';

@Component({
  selector: 'jhi-tipo-oferta-detail',
  templateUrl: './tipo-oferta-detail.component.html',
})
export class TipoOfertaDetailComponent implements OnInit {
  tipoOferta: ITipoOferta | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoOferta }) => (this.tipoOferta = tipoOferta));
  }

  previousState(): void {
    window.history.back();
  }
}
