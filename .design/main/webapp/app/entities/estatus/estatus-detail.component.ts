import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstatus } from 'app/shared/model/estatus.model';

@Component({
  selector: 'jhi-estatus-detail',
  templateUrl: './estatus-detail.component.html',
})
export class EstatusDetailComponent implements OnInit {
  estatus: IEstatus | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estatus }) => (this.estatus = estatus));
  }

  previousState(): void {
    window.history.back();
  }
}
