import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOfertaProveedor } from 'app/shared/model/oferta-proveedor.model';
import { OfertaProveedorService } from './oferta-proveedor.service';

@Component({
  templateUrl: './oferta-proveedor-delete-dialog.component.html',
})
export class OfertaProveedorDeleteDialogComponent {
  ofertaProveedor?: IOfertaProveedor;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected ofertaProveedorService: OfertaProveedorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ofertaProveedorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ofertaProveedorListModification');
      this.activeModal.close();
    });
  }
}
