import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
  templateUrl: './empresa-delete-dialog.component.html',
})
export class EmpresaDeleteDialogComponent {
  empresa?: IEmpresa;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected empresaService: EmpresaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.empresaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('empresaListModification');
      this.activeModal.close();
    });
  }
}
