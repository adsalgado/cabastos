import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecolectorTarifa } from 'app/shared/model/recolector-tarifa.model';
import { RecolectorTarifaService } from './recolector-tarifa.service';
import { RecolectorTarifaDeleteDialogComponent } from './recolector-tarifa-delete-dialog.component';

@Component({
  selector: 'jhi-recolector-tarifa',
  templateUrl: './recolector-tarifa.component.html',
})
export class RecolectorTarifaComponent implements OnInit, OnDestroy {
  recolectorTarifas?: IRecolectorTarifa[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected recolectorTarifaService: RecolectorTarifaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.recolectorTarifaService.query().subscribe((res: HttpResponse<IRecolectorTarifa[]>) => (this.recolectorTarifas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRecolectorTarifas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRecolectorTarifa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRecolectorTarifas(): void {
    this.eventSubscriber = this.eventManager.subscribe('recolectorTarifaListModification', () => this.loadAll());
  }

  delete(recolectorTarifa: IRecolectorTarifa): void {
    const modalRef = this.modalService.open(RecolectorTarifaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recolectorTarifa = recolectorTarifa;
  }
}
