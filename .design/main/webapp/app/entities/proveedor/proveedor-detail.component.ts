import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProveedor } from 'app/shared/model/proveedor.model';

@Component({
  selector: 'jhi-proveedor-detail',
  templateUrl: './proveedor-detail.component.html',
})
export class ProveedorDetailComponent implements OnInit {
  proveedor: IProveedor | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proveedor }) => (this.proveedor = proveedor));
  }

  previousState(): void {
    window.history.back();
  }
}
