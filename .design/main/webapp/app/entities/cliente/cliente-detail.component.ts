import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICliente } from 'app/shared/model/cliente.model';

@Component({
  selector: 'jhi-cliente-detail',
  templateUrl: './cliente-detail.component.html',
})
export class ClienteDetailComponent implements OnInit {
  cliente: ICliente | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => (this.cliente = cliente));
  }

  previousState(): void {
    window.history.back();
  }
}
