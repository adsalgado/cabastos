import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';

@Component({
  templateUrl: './seccion-delete-dialog.component.html',
})
export class SeccionDeleteDialogComponent {
  seccion?: ISeccion;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected seccionService: SeccionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seccionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('seccionListModification');
      this.activeModal.close();
    });
  }
}
