import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecolector } from 'app/shared/model/recolector.model';

@Component({
  selector: 'jhi-recolector-detail',
  templateUrl: './recolector-detail.component.html',
})
export class RecolectorDetailComponent implements OnInit {
  recolector: IRecolector | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recolector }) => (this.recolector = recolector));
  }

  previousState(): void {
    window.history.back();
  }
}
