import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfertaProveedor } from 'app/shared/model/oferta-proveedor.model';

@Component({
  selector: 'jhi-oferta-proveedor-detail',
  templateUrl: './oferta-proveedor-detail.component.html',
})
export class OfertaProveedorDetailComponent implements OnInit {
  ofertaProveedor: IOfertaProveedor | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ofertaProveedor }) => (this.ofertaProveedor = ofertaProveedor));
  }

  previousState(): void {
    window.history.back();
  }
}
