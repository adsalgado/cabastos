import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPedidoDetalle, PedidoDetalle } from 'app/shared/model/pedido-detalle.model';
import { PedidoDetalleService } from './pedido-detalle.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from 'app/entities/estatus/estatus.service';

type SelectableEntity = IPedido | IProducto | IEstatus;

@Component({
  selector: 'jhi-pedido-detalle-update',
  templateUrl: './pedido-detalle-update.component.html',
})
export class PedidoDetalleUpdateComponent implements OnInit {
  isSaving = false;
  pedidos: IPedido[] = [];
  productos: IProducto[] = [];
  estatuses: IEstatus[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    totalSinIva: [],
    total: [],
    pedidoId: [],
    productoId: [],
    estatusId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected pedidoDetalleService: PedidoDetalleService,
    protected pedidoService: PedidoService,
    protected productoService: ProductoService,
    protected estatusService: EstatusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedidoDetalle }) => {
      this.updateForm(pedidoDetalle);

      this.pedidoService.query().subscribe((res: HttpResponse<IPedido[]>) => (this.pedidos = res.body || []));

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));

      this.estatusService.query().subscribe((res: HttpResponse<IEstatus[]>) => (this.estatuses = res.body || []));
    });
  }

  updateForm(pedidoDetalle: IPedidoDetalle): void {
    this.editForm.patchValue({
      id: pedidoDetalle.id,
      cantidad: pedidoDetalle.cantidad,
      totalSinIva: pedidoDetalle.totalSinIva,
      total: pedidoDetalle.total,
      pedidoId: pedidoDetalle.pedidoId,
      productoId: pedidoDetalle.productoId,
      estatusId: pedidoDetalle.estatusId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pedidoDetalle = this.createFromForm();
    if (pedidoDetalle.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoDetalleService.update(pedidoDetalle));
    } else {
      this.subscribeToSaveResponse(this.pedidoDetalleService.create(pedidoDetalle));
    }
  }

  private createFromForm(): IPedidoDetalle {
    return {
      ...new PedidoDetalle(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      totalSinIva: this.editForm.get(['totalSinIva'])!.value,
      total: this.editForm.get(['total'])!.value,
      pedidoId: this.editForm.get(['pedidoId'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
      estatusId: this.editForm.get(['estatusId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedidoDetalle>>): void {
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
