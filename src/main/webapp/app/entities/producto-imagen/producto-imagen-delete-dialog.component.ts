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

  constructor(
    protected productoImagenService: ProductoImagenService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

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
