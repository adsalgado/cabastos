import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductoImagen } from 'app/shared/model/producto-imagen.model';
import { ProductoImagenService } from './producto-imagen.service';

@Component({
  templateUrl: './producto-imagen-delete-dialog.component.html',
})
export class ProductoImagenDeleteDialogComponent {
  productoImagen?: IProductoImagen;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected productoImagenService: ProductoImagenService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productoImagenService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productoImagenListModification');
      this.activeModal.close();
    });
  }
}
