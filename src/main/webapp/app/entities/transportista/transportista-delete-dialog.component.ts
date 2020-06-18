import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportista } from 'app/shared/model/transportista.model';
import { TransportistaService } from './transportista.service';

@Component({
  templateUrl: './transportista-delete-dialog.component.html',
})
export class TransportistaDeleteDialogComponent {
  transportista?: ITransportista;

  constructor(
    protected transportistaService: TransportistaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transportistaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transportistaListModification');
      this.activeModal.close();
    });
  }
}
