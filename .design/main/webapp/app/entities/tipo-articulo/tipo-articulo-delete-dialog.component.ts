import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoArticulo } from 'app/shared/model/tipo-articulo.model';
import { TipoArticuloService } from './tipo-articulo.service';

@Component({
  templateUrl: './tipo-articulo-delete-dialog.component.html',
})
export class TipoArticuloDeleteDialogComponent {
  tipoArticulo?: ITipoArticulo;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected tipoArticuloService: TipoArticuloService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoArticuloService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoArticuloListModification');
      this.activeModal.close();
    });
  }
}
