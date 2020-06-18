import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParametrosAplicacion } from 'app/shared/model/parametros-aplicacion.model';
import { ParametrosAplicacionService } from './parametros-aplicacion.service';
import { ParametrosAplicacionDeleteDialogComponent } from './parametros-aplicacion-delete-dialog.component';

@Component({
  selector: 'jhi-parametros-aplicacion',
  templateUrl: './parametros-aplicacion.component.html',
})
export class ParametrosAplicacionComponent implements OnInit, OnDestroy {
  parametrosAplicacions?: IParametrosAplicacion[];
  eventSubscriber?: Subscription;

  constructor(
    protected parametrosAplicacionService: ParametrosAplicacionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.parametrosAplicacionService
      .query()
      .subscribe((res: HttpResponse<IParametrosAplicacion[]>) => (this.parametrosAplicacions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParametrosAplicacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParametrosAplicacion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParametrosAplicacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('parametrosAplicacionListModification', () => this.loadAll());
  }

  delete(parametrosAplicacion: IParametrosAplicacion): void {
    const modalRef = this.modalService.open(ParametrosAplicacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parametrosAplicacion = parametrosAplicacion;
  }
}
