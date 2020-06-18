import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagos } from 'app/shared/model/pagos.model';

@Component({
  selector: 'jhi-pagos-detail',
  templateUrl: './pagos-detail.component.html',
})
export class PagosDetailComponent implements OnInit {
  pagos: IPagos | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagos }) => (this.pagos = pagos));
  }

  previousState(): void {
    window.history.back();
  }
}
