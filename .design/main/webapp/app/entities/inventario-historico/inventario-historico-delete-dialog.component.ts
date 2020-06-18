import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInventarioHistorico } from 'app/shared/model/inventario-historico.model';
import { InventarioHistoricoService } from './inventario-historico.service';

@Component({
  templateUrl: './inventario-historico-delete-dialog.component.html',
})
export class InventarioHistoricoDeleteDialogComponent {
  inventarioHistorico?: IInventarioHistorico;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected inventarioHistoricoService: InventarioHistoricoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inventarioHistoricoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inventarioHistoricoListModification');
      this.activeModal.close();
    });
  }
}
