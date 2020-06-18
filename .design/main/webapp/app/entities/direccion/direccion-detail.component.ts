import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDireccion } from 'app/shared/model/direccion.model';

@Component({
  selector: 'jhi-direccion-detail',
  templateUrl: './direccion-detail.component.html',
})
export class DireccionDetailComponent implements OnInit {
  direccion: IDireccion | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direccion }) => (this.direccion = direccion));
  }

  previousState(): void {
    window.history.back();
  }
}
