import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductoImagen, ProductoImagen } from 'app/shared/model/producto-imagen.model';
import { ProductoImagenService } from './producto-imagen.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from 'app/entities/adjunto/adjunto.service';

type SelectableEntity = IUser | IProducto | IAdjunto;

@Component({
  selector: 'jhi-producto-imagen-update',
  templateUrl: './producto-imagen-update.component.html',
})
export class ProductoImagenUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  productos: IProducto[] = [];
  adjuntos: IAdjunto[] = [];

  editForm = this.fb.group({
    id: [],
    fechaAlta: [],
    usuarioAltaId: [],
    productoId: [],
    adjuntoId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected productoImagenService: ProductoImagenService,
    protected userService: UserService,
    protected productoService: ProductoService,
    protected adjuntoService: AdjuntoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoImagen }) => {
      if (!productoImagen.id) {
        const today = moment().startOf('day');
        productoImagen.fechaAlta = today;
      }

      this.updateForm(productoImagen);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));

      this.adjuntoService.query().subscribe((res: HttpResponse<IAdjunto[]>) => (this.adjuntos = res.body || []));
    });
  }

  updateForm(productoImagen: IProductoImagen): void {
    this.editForm.patchValue({
      id: productoImagen.id,
      fechaAlta: productoImagen.fechaAlta ? productoImagen.fechaAlta.format(DATE_TIME_FORMAT) : null,
      usuarioAltaId: productoImagen.usuarioAltaId,
      productoId: productoImagen.productoId,
      adjuntoId: productoImagen.adjuntoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productoImagen = this.createFromForm();
    if (productoImagen.id !== undefined) {
      this.subscribeToSaveResponse(this.productoImagenService.update(productoImagen));
    } else {
      this.subscribeToSaveResponse(this.productoImagenService.create(productoImagen));
    }
  }

  private createFromForm(): IProductoImagen {
    return {
      ...new ProductoImagen(),
      id: this.editForm.get(['id'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value ? moment(this.editForm.get(['fechaAlta'])!.value, DATE_TIME_FORMAT) : undefined,
      usuarioAltaId: this.editForm.get(['usuarioAltaId'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
      adjuntoId: this.editForm.get(['adjuntoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductoImagen>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
