import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';
import { CategoriaDeleteDialogComponent } from './categoria-delete-dialog.component';

@Component({
  selector: 'jhi-categoria',
  templateUrl: './categoria.component.html',
})
export class CategoriaComponent implements OnInit, OnDestroy {
  categorias?: ICategoria[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected categoriaService: CategoriaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.categoriaService.query().subscribe((res: HttpResponse<ICategoria[]>) => (this.categorias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCategorias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICategoria): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCategorias(): void {
    this.eventSubscriber = this.eventManager.subscribe('categoriaListModification', () => this.loadAll());
  }

  delete(categoria: ICategoria): void {
    const modalRef = this.modalService.open(CategoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.categoria = categoria;
  }
}
