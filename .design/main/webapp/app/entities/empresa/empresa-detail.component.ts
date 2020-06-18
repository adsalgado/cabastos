import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmpresa } from 'app/shared/model/empresa.model';

@Component({
  selector: 'jhi-empresa-detail',
  templateUrl: './empresa-detail.component.html',
})
export class EmpresaDetailComponent implements OnInit {
  empresa: IEmpresa | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empresa }) => (this.empresa = empresa));
  }

  previousState(): void {
    window.history.back();
  }
}
