import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from './empresa.service';
import { EmpresaDeleteDialogComponent } from './empresa-delete-dialog.component';

@Component({
  selector: 'jhi-empresa',
  templateUrl: './empresa.component.html',
})
export class EmpresaComponent implements OnInit, OnDestroy {
  empresas?: IEmpresa[];
  eventSubscriber?: Subscription;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected empresaService: EmpresaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {this.__componentInspectorService.getComp(this);
}

  loadAll(): void {
    this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmpresas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmpresa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmpresas(): void {
    this.eventSubscriber = this.eventManager.subscribe('empresaListModification', () => this.loadAll());
  }

  delete(empresa: IEmpresa): void {
    const modalRef = this.modalService.open(EmpresaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.empresa = empresa;
  }
}
