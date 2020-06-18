import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
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

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected parametrosAplicacionService: ParametrosAplicacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

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
