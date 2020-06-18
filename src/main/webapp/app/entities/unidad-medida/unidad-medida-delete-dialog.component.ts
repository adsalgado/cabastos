import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnidadMedida } from 'app/shared/model/unidad-medida.model';
import { UnidadMedidaService } from './unidad-medida.service';

@Component({
  templateUrl: './unidad-medida-delete-dialog.component.html',
})
export class UnidadMedidaDeleteDialogComponent {
  unidadMedida?: IUnidadMedida;

  constructor(
    protected unidadMedidaService: UnidadMedidaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadMedidaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('unidadMedidaListModification');
      this.activeModal.close();
    });
  }
}
