import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoArticulo } from 'app/shared/model/tipo-articulo.model';
import { TipoArticuloService } from './tipo-articulo.service';
import { TipoArticuloDeleteDialogComponent } from './tipo-articulo-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-articulo',
  templateUrl: './tipo-articulo.component.html',
})
export class TipoArticuloComponent implements OnInit, OnDestroy {
  tipoArticulos?: ITipoArticulo[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoArticuloService: TipoArticuloService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoArticuloService.query().subscribe((res: HttpResponse<ITipoArticulo[]>) => (this.tipoArticulos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoArticulos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoArticulo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoArticulos(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoArticuloListModification', () => this.loadAll());
  }

  delete(tipoArticulo: ITipoArticulo): void {
    const modalRef = this.modalService.open(TipoArticuloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoArticulo = tipoArticulo;
  }
}
