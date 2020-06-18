import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecolector } from 'app/shared/model/recolector.model';
import { RecolectorService } from './recolector.service';

@Component({
  templateUrl: './recolector-delete-dialog.component.html',
})
export class RecolectorDeleteDialogComponent {
  recolector?: IRecolector;

  constructor(
    protected recolectorService: RecolectorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.recolectorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('recolectorListModification');
      this.activeModal.close();
    });
  }
}
