import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDireccion } from 'app/shared/model/direccion.model';
import { DireccionService } from './direccion.service';

@Component({
  templateUrl: './direccion-delete-dialog.component.html',
})
export class DireccionDeleteDialogComponent {
  direccion?: IDireccion;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected direccionService: DireccionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.direccionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('direccionListModification');
      this.activeModal.close();
    });
  }
}
