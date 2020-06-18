import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotificacion } from 'app/shared/model/notificacion.model';

@Component({
  selector: 'jhi-notificacion-detail',
  templateUrl: './notificacion-detail.component.html',
})
export class NotificacionDetailComponent implements OnInit {
  notificacion: INotificacion | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notificacion }) => (this.notificacion = notificacion));
  }

  previousState(): void {
    window.history.back();
  }
}
