import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from './proveedor.service';

@Component({
  templateUrl: './proveedor-delete-dialog.component.html',
})
export class ProveedorDeleteDialogComponent {
  proveedor?: IProveedor;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected proveedorService: ProveedorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proveedorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('proveedorListModification');
      this.activeModal.close();
    });
  }
}
