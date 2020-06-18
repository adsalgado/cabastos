import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from './adjunto.service';

@Component({
  templateUrl: './adjunto-delete-dialog.component.html',
})
export class AdjuntoDeleteDialogComponent {
  adjunto?: IAdjunto;

  constructor(protected adjuntoService: AdjuntoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adjuntoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adjuntoListModification');
      this.activeModal.close();
    });
  }
}
