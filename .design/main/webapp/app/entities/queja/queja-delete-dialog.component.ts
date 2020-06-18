import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQueja } from 'app/shared/model/queja.model';
import { QuejaService } from './queja.service';

@Component({
  templateUrl: './queja-delete-dialog.component.html',
})
export class QuejaDeleteDialogComponent {
  queja?: IQueja;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected quejaService: QuejaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quejaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('quejaListModification');
      this.activeModal.close();
    });
  }
}
