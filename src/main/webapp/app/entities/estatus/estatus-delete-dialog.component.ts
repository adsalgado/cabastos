import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from './estatus.service';

@Component({
  templateUrl: './estatus-delete-dialog.component.html',
})
export class EstatusDeleteDialogComponent {
  estatus?: IEstatus;

  constructor(protected estatusService: EstatusService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estatusService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estatusListModification');
      this.activeModal.close();
    });
  }
}
