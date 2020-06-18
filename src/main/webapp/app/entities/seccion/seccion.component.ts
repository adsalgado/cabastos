import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';
import { SeccionDeleteDialogComponent } from './seccion-delete-dialog.component';

@Component({
  selector: 'jhi-seccion',
  templateUrl: './seccion.component.html',
})
export class SeccionComponent implements OnInit, OnDestroy {
  seccions?: ISeccion[];
  eventSubscriber?: Subscription;

  constructor(protected seccionService: SeccionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.seccionService.query().subscribe((res: HttpResponse<ISeccion[]>) => (this.seccions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSeccions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISeccion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSeccions(): void {
    this.eventSubscriber = this.eventManager.subscribe('seccionListModification', () => this.loadAll());
  }

  delete(seccion: ISeccion): void {
    const modalRef = this.modalService.open(SeccionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.seccion = seccion;
  }
}
