import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParametrosAplicacion } from 'app/shared/model/parametros-aplicacion.model';
import { ParametrosAplicacionService } from './parametros-aplicacion.service';

@Component({
  templateUrl: './parametros-aplicacion-delete-dialog.component.html',
})
export class ParametrosAplicacionDeleteDialogComponent {
  parametrosAplicacion?: IParametrosAplicacion;

  constructor(
    protected parametrosAplicacionService: ParametrosAplicacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parametrosAplicacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('parametrosAplicacionListModification');
      this.activeModal.close();
    });
  }
}
