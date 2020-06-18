import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITarjeta } from 'app/shared/model/tarjeta.model';

@Component({
  selector: 'jhi-tarjeta-detail',
  templateUrl: './tarjeta-detail.component.html',
})
export class TarjetaDetailComponent implements OnInit {
  tarjeta: ITarjeta | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarjeta }) => (this.tarjeta = tarjeta));
  }

  previousState(): void {
    window.history.back();
  }
}
