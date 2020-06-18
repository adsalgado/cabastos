import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPedido, Pedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from 'app/entities/estatus/estatus.service';
import { ITransportista } from 'app/shared/model/transportista.model';
import { TransportistaService } from 'app/entities/transportista/transportista.service';
import { IRecolector } from 'app/shared/model/recolector.model';
import { RecolectorService } from 'app/entities/recolector/recolector.service';

type SelectableEntity = ICliente | IEstatus | ITransportista | IRecolector;

@Component({
  selector: 'jhi-pedido-update',
  templateUrl: './pedido-update.component.html',
})
export class PedidoUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  estatuses: IEstatus[] = [];
  transportistas: ITransportista[] = [];
  recolectors: IRecolector[] = [];
  fechaPedidoDp: any;
  fechaPreparacionDp: any;
  fechaCobroDp: any;
  fechaEntregaDp: any;

  editForm = this.fb.group({
    id: [],
    totalSinIva: [],
    comisionTransportista: [],
    comisionPreparador: [],
    total: [],
    fechaPedido: [],
    fechaPreparacion: [],
    fechaCobro: [],
    fechaEntrega: [],
    clienteId: [],
    estatusId: [],
    transportistaId: [],
    recolectorId: [],
  });

  constructor(
    protected pedidoService: PedidoService,
    protected clienteService: ClienteService,
    protected estatusService: EstatusService,
    protected transportistaService: TransportistaService,
    protected recolectorService: RecolectorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.updateForm(pedido);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));

      this.estatusService.query().subscribe((res: HttpResponse<IEstatus[]>) => (this.estatuses = res.body || []));

      this.transportistaService.query().subscribe((res: HttpResponse<ITransportista[]>) => (this.transportistas = res.body || []));

      this.recolectorService.query().subscribe((res: HttpResponse<IRecolector[]>) => (this.recolectors = res.body || []));
    });
  }

  updateForm(pedido: IPedido): void {
    this.editForm.patchValue({
      id: pedido.id,
      totalSinIva: pedido.totalSinIva,
      comisionTransportista: pedido.comisionTransportista,
      comisionPreparador: pedido.comisionPreparador,
      total: pedido.total,
      fechaPedido: pedido.fechaPedido,
      fechaPreparacion: pedido.fechaPreparacion,
      fechaCobro: pedido.fechaCobro,
      fechaEntrega: pedido.fechaEntrega,
      clienteId: pedido.clienteId,
      estatusId: pedido.estatusId,
      transportistaId: pedido.transportistaId,
      recolectorId: pedido.recolectorId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pedido = this.createFromForm();
    if (pedido.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    }
  }

  private createFromForm(): IPedido {
    return {
      ...new Pedido(),
      id: this.editForm.get(['id'])!.value,
      totalSinIva: this.editForm.get(['totalSinIva'])!.value,
      comisionTransportista: this.editForm.get(['comisionTransportista'])!.value,
      comisionPreparador: this.editForm.get(['comisionPreparador'])!.value,
      total: this.editForm.get(['total'])!.value,
      fechaPedido: this.editForm.get(['fechaPedido'])!.value,
      fechaPreparacion: this.editForm.get(['fechaPreparacion'])!.value,
      fechaCobro: this.editForm.get(['fechaCobro'])!.value,
      fechaEntrega: this.editForm.get(['fechaEntrega'])!.value,
      clienteId: this.editForm.get(['clienteId'])!.value,
      estatusId: this.editForm.get(['estatusId'])!.value,
      transportistaId: this.editForm.get(['transportistaId'])!.value,
      recolectorId: this.editForm.get(['recolectorId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedido>>): void {
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
