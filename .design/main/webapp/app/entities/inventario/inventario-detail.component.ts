import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInventario } from 'app/shared/model/inventario.model';

@Component({
  selector: 'jhi-inventario-detail',
  templateUrl: './inventario-detail.component.html',
})
export class InventarioDetailComponent implements OnInit {
  inventario: IInventario | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inventario }) => (this.inventario = inventario));
  }

  previousState(): void {
    window.history.back();
  }
}
