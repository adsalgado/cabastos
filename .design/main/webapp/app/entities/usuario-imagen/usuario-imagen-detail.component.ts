import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioImagen } from 'app/shared/model/usuario-imagen.model';

@Component({
  selector: 'jhi-usuario-imagen-detail',
  templateUrl: './usuario-imagen-detail.component.html',
})
export class UsuarioImagenDetailComponent implements OnInit {
  usuarioImagen: IUsuarioImagen | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioImagen }) => (this.usuarioImagen = usuarioImagen));
  }

  previousState(): void {
    window.history.back();
  }
}
