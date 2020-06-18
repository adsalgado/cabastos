import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnidadMedida } from 'app/shared/model/unidad-medida.model';

@Component({
  selector: 'jhi-unidad-medida-detail',
  templateUrl: './unidad-medida-detail.component.html',
})
export class UnidadMedidaDetailComponent implements OnInit {
  unidadMedida: IUnidadMedida | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadMedida }) => (this.unidadMedida = unidadMedida));
  }

  previousState(): void {
    window.history.back();
  }
}
