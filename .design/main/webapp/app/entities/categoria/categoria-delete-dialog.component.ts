import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';

@Component({
  templateUrl: './categoria-delete-dialog.component.html',
})
export class CategoriaDeleteDialogComponent {
  categoria?: ICategoria;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected categoriaService: CategoriaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoriaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('categoriaListModification');
      this.activeModal.close();
    });
  }
}
