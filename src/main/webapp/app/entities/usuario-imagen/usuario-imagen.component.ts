import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarioImagen } from 'app/shared/model/usuario-imagen.model';
import { UsuarioImagenService } from './usuario-imagen.service';
import { UsuarioImagenDeleteDialogComponent } from './usuario-imagen-delete-dialog.component';

@Component({
  selector: 'jhi-usuario-imagen',
  templateUrl: './usuario-imagen.component.html',
})
export class UsuarioImagenComponent implements OnInit, OnDestroy {
  usuarioImagens?: IUsuarioImagen[];
  eventSubscriber?: Subscription;

  constructor(
    protected usuarioImagenService: UsuarioImagenService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.usuarioImagenService.query().subscribe((res: HttpResponse<IUsuarioImagen[]>) => (this.usuarioImagens = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUsuarioImagens();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUsuarioImagen): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUsuarioImagens(): void {
    this.eventSubscriber = this.eventManager.subscribe('usuarioImagenListModification', () => this.loadAll());
  }

  delete(usuarioImagen: IUsuarioImagen): void {
    const modalRef = this.modalService.open(UsuarioImagenDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.usuarioImagen = usuarioImagen;
  }
}
