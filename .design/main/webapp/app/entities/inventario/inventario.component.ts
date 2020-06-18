import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInventario } from 'app/shared/model/inventario.model';
import { InventarioService } from './inventario.service';
import { InventarioDeleteDialogComponent } from './inventario-delete-dialog.component';

@Component({
  selector: 'jhi-inventario',
  templateUrl: './inventario.component.html',
})
export class InventarioComponent implements OnInit, OnDestroy {
  inventarios?: IInventario[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected inventarioService: InventarioService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.inventarioService.query().subscribe((res: HttpResponse<IInventario[]>) => (this.inventarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInventarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInventario): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInventarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('inventarioListModification', () => this.loadAll());
  }

  delete(inventario: IInventario): void {
    const modalRef = this.modalService.open(InventarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inventario = inventario;
  }
}
