import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoria } from 'app/shared/model/categoria.model';

@Component({
  selector: 'jhi-categoria-detail',
  templateUrl: './categoria-detail.component.html',
})
export class CategoriaDetailComponent implements OnInit {
  categoria: ICategoria | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoria }) => (this.categoria = categoria));
  }

  previousState(): void {
    window.history.back();
  }
}
