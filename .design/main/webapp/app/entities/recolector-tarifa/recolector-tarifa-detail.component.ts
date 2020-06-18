import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecolectorTarifa } from 'app/shared/model/recolector-tarifa.model';

@Component({
  selector: 'jhi-recolector-tarifa-detail',
  templateUrl: './recolector-tarifa-detail.component.html',
})
export class RecolectorTarifaDetailComponent implements OnInit {
  recolectorTarifa: IRecolectorTarifa | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recolectorTarifa }) => (this.recolectorTarifa = recolectorTarifa));
  }

  previousState(): void {
    window.history.back();
  }
}
