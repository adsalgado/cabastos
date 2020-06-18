import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportistaTarifa } from 'app/shared/model/transportista-tarifa.model';

@Component({
  selector: 'jhi-transportista-tarifa-detail',
  templateUrl: './transportista-tarifa-detail.component.html',
})
export class TransportistaTarifaDetailComponent implements OnInit {
  transportistaTarifa: ITransportistaTarifa | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transportistaTarifa }) => (this.transportistaTarifa = transportistaTarifa));
  }

  previousState(): void {
    window.history.back();
  }
}
