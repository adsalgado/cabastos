import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoOferta } from 'app/shared/model/tipo-oferta.model';
import { TipoOfertaService } from './tipo-oferta.service';

@Component({
  templateUrl: './tipo-oferta-delete-dialog.component.html',
})
export class TipoOfertaDeleteDialogComponent {
  tipoOferta?: ITipoOferta;

  constructor(
    protected tipoOfertaService: TipoOfertaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoOfertaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoOfertaListModification');
      this.activeModal.close();
    });
  }
}
