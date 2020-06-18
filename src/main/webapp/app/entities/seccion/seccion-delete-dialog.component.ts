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

  constructor(protected seccionService: SeccionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

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
