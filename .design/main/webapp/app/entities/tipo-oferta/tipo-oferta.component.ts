import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoOferta } from 'app/shared/model/tipo-oferta.model';
import { TipoOfertaService } from './tipo-oferta.service';
import { TipoOfertaDeleteDialogComponent } from './tipo-oferta-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-oferta',
  templateUrl: './tipo-oferta.component.html',
})
export class TipoOfertaComponent implements OnInit, OnDestroy {
  tipoOfertas?: ITipoOferta[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected tipoOfertaService: TipoOfertaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.tipoOfertaService.query().subscribe((res: HttpResponse<ITipoOferta[]>) => (this.tipoOfertas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoOfertas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoOferta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoOfertas(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoOfertaListModification', () => this.loadAll());
  }

  delete(tipoOferta: ITipoOferta): void {
    const modalRef = this.modalService.open(TipoOfertaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoOferta = tipoOferta;
  }
}
