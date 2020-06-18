import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnidadMedida } from 'app/shared/model/unidad-medida.model';
import { UnidadMedidaService } from './unidad-medida.service';
import { UnidadMedidaDeleteDialogComponent } from './unidad-medida-delete-dialog.component';

@Component({
  selector: 'jhi-unidad-medida',
  templateUrl: './unidad-medida.component.html',
})
export class UnidadMedidaComponent implements OnInit, OnDestroy {
  unidadMedidas?: IUnidadMedida[];
  eventSubscriber?: Subscription;

  constructor(
    protected unidadMedidaService: UnidadMedidaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.unidadMedidaService.query().subscribe((res: HttpResponse<IUnidadMedida[]>) => (this.unidadMedidas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUnidadMedidas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUnidadMedida): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUnidadMedidas(): void {
    this.eventSubscriber = this.eventManager.subscribe('unidadMedidaListModification', () => this.loadAll());
  }

  delete(unidadMedida: IUnidadMedida): void {
    const modalRef = this.modalService.open(UnidadMedidaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unidadMedida = unidadMedida;
  }
}
