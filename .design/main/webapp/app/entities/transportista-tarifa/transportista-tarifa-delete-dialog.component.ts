import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportistaTarifa } from 'app/shared/model/transportista-tarifa.model';
import { TransportistaTarifaService } from './transportista-tarifa.service';

@Component({
  templateUrl: './transportista-tarifa-delete-dialog.component.html',
})
export class TransportistaTarifaDeleteDialogComponent {
  transportistaTarifa?: ITransportistaTarifa;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected transportistaTarifaService: TransportistaTarifaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transportistaTarifaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transportistaTarifaListModification');
      this.activeModal.close();
    });
  }
}
