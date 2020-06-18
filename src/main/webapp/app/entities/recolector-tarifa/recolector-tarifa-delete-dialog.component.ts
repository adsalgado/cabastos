import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecolectorTarifa } from 'app/shared/model/recolector-tarifa.model';
import { RecolectorTarifaService } from './recolector-tarifa.service';

@Component({
  templateUrl: './recolector-tarifa-delete-dialog.component.html',
})
export class RecolectorTarifaDeleteDialogComponent {
  recolectorTarifa?: IRecolectorTarifa;

  constructor(
    protected recolectorTarifaService: RecolectorTarifaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.recolectorTarifaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('recolectorTarifaListModification');
      this.activeModal.close();
    });
  }
}
