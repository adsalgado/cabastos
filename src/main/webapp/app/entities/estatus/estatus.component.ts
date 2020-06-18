import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from './estatus.service';
import { EstatusDeleteDialogComponent } from './estatus-delete-dialog.component';

@Component({
  selector: 'jhi-estatus',
  templateUrl: './estatus.component.html',
})
export class EstatusComponent implements OnInit, OnDestroy {
  estatuses?: IEstatus[];
  eventSubscriber?: Subscription;

  constructor(protected estatusService: EstatusService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.estatusService.query().subscribe((res: HttpResponse<IEstatus[]>) => (this.estatuses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstatuses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstatus): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstatuses(): void {
    this.eventSubscriber = this.eventManager.subscribe('estatusListModification', () => this.loadAll());
  }

  delete(estatus: IEstatus): void {
    const modalRef = this.modalService.open(EstatusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estatus = estatus;
  }
}
