import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoricoPedido, HistoricoPedido } from 'app/shared/model/historico-pedido.model';
import { HistoricoPedidoService } from './historico-pedido.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';

@Component({
  selector: 'jhi-historico-pedido-update',
  templateUrl: './historico-pedido-update.component.html',
})
export class HistoricoPedidoUpdateComponent implements OnInit {
  isSaving = false;
  pedidos: IPedido[] = [];
  fechaEstatusDp: any;

  editForm = this.fb.group({
    id: [],
    fechaEstatus: [],
    pedidoId: [],
  });

  constructor(
    protected historicoPedidoService: HistoricoPedidoService,
    protected pedidoService: PedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historicoPedido }) => {
      this.updateForm(historicoPedido);

      this.pedidoService.query().subscribe((res: HttpResponse<IPedido[]>) => (this.pedidos = res.body || []));
    });
  }

  updateForm(historicoPedido: IHistoricoPedido): void {
    this.editForm.patchValue({
      id: historicoPedido.id,
      fechaEstatus: historicoPedido.fechaEstatus,
      pedidoId: historicoPedido.pedidoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historicoPedido = this.createFromForm();
    if (historicoPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.historicoPedidoService.update(historicoPedido));
    } else {
      this.subscribeToSaveResponse(this.historicoPedidoService.create(historicoPedido));
    }
  }

  private createFromForm(): IHistoricoPedido {
    return {
      ...new HistoricoPedido(),
      id: this.editForm.get(['id'])!.value,
      fechaEstatus: this.editForm.get(['fechaEstatus'])!.value,
      pedidoId: this.editForm.get(['pedidoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoricoPedido>>): void {
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

  trackById(index: number, item: IPedido): any {
    return item.id;
  }
}
