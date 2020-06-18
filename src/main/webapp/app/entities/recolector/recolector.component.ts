import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecolector } from 'app/shared/model/recolector.model';
import { RecolectorService } from './recolector.service';
import { RecolectorDeleteDialogComponent } from './recolector-delete-dialog.component';

@Component({
  selector: 'jhi-recolector',
  templateUrl: './recolector.component.html',
})
export class RecolectorComponent implements OnInit, OnDestroy {
  recolectors?: IRecolector[];
  eventSubscriber?: Subscription;

  constructor(protected recolectorService: RecolectorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.recolectorService.query().subscribe((res: HttpResponse<IRecolector[]>) => (this.recolectors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRecolectors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRecolector): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRecolectors(): void {
    this.eventSubscriber = this.eventManager.subscribe('recolectorListModification', () => this.loadAll());
  }

  delete(recolector: IRecolector): void {
    const modalRef = this.modalService.open(RecolectorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recolector = recolector;
  }
}
