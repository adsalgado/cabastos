import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagos } from 'app/shared/model/pagos.model';
import { PagosService } from './pagos.service';

@Component({
  templateUrl: './pagos-delete-dialog.component.html',
})
export class PagosDeleteDialogComponent {
  pagos?: IPagos;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected pagosService: PagosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pagosListModification');
      this.activeModal.close();
    });
  }
}
