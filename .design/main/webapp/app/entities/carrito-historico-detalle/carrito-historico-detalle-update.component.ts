import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarritoHistoricoDetalle, CarritoHistoricoDetalle } from 'app/shared/model/carrito-historico-detalle.model';
import { CarritoHistoricoDetalleService } from './carrito-historico-detalle.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { ICarritoHistorico } from 'app/shared/model/carrito-historico.model';
import { CarritoHistoricoService } from 'app/entities/carrito-historico/carrito-historico.service';

type SelectableEntity = IProducto | ICarritoHistorico;

@Component({
  selector: 'jhi-carrito-historico-detalle-update',
  templateUrl: './carrito-historico-detalle-update.component.html',
})
export class CarritoHistoricoDetalleUpdateComponent implements OnInit {
  isSaving = false;
  productos: IProducto[] = [];
  carritohistoricos: ICarritoHistorico[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    precio: [],
    productoId: [],
    carritoHistoricoId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected carritoHistoricoDetalleService: CarritoHistoricoDetalleService,
    protected productoService: ProductoService,
    protected carritoHistoricoService: CarritoHistoricoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoHistoricoDetalle }) => {
      this.updateForm(carritoHistoricoDetalle);

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));

      this.carritoHistoricoService.query().subscribe((res: HttpResponse<ICarritoHistorico[]>) => (this.carritohistoricos = res.body || []));
    });
  }

  updateForm(carritoHistoricoDetalle: ICarritoHistoricoDetalle): void {
    this.editForm.patchValue({
      id: carritoHistoricoDetalle.id,
      cantidad: carritoHistoricoDetalle.cantidad,
      precio: carritoHistoricoDetalle.precio,
      productoId: carritoHistoricoDetalle.productoId,
      carritoHistoricoId: carritoHistoricoDetalle.carritoHistoricoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carritoHistoricoDetalle = this.createFromForm();
    if (carritoHistoricoDetalle.id !== undefined) {
      this.subscribeToSaveResponse(this.carritoHistoricoDetalleService.update(carritoHistoricoDetalle));
    } else {
      this.subscribeToSaveResponse(this.carritoHistoricoDetalleService.create(carritoHistoricoDetalle));
    }
  }

  private createFromForm(): ICarritoHistoricoDetalle {
    return {
      ...new CarritoHistoricoDetalle(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
      carritoHistoricoId: this.editForm.get(['carritoHistoricoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarritoHistoricoDetalle>>): void {
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
