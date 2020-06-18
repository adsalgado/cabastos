import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductoImagen } from 'app/shared/model/producto-imagen.model';

@Component({
  selector: 'jhi-producto-imagen-detail',
  templateUrl: './producto-imagen-detail.component.html',
})
export class ProductoImagenDetailComponent implements OnInit {
  productoImagen: IProductoImagen | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoImagen }) => (this.productoImagen = productoImagen));
  }

  previousState(): void {
    window.history.back();
  }
}
