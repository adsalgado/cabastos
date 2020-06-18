import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQueja } from 'app/shared/model/queja.model';

@Component({
  selector: 'jhi-queja-detail',
  templateUrl: './queja-detail.component.html',
})
export class QuejaDetailComponent implements OnInit {
  queja: IQueja | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ queja }) => (this.queja = queja));
  }

  previousState(): void {
    window.history.back();
  }
}
