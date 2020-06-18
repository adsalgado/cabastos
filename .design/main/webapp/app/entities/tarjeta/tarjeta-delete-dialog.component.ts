import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from './tarjeta.service';

@Component({
  templateUrl: './tarjeta-delete-dialog.component.html',
})
export class TarjetaDeleteDialogComponent {
  tarjeta?: ITarjeta;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected tarjetaService: TarjetaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tarjetaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tarjetaListModification');
      this.activeModal.close();
    });
  }
}
