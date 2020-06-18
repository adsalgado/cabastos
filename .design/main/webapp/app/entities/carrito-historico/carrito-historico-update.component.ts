import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarritoHistorico, CarritoHistorico } from 'app/shared/model/carrito-historico.model';
import { CarritoHistoricoService } from './carrito-historico.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-carrito-historico-update',
  templateUrl: './carrito-historico-update.component.html',
})
export class CarritoHistoricoUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  fechaAltaDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
    fechaAlta: [null, [Validators.required]],
    clienteId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected carritoHistoricoService: CarritoHistoricoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoHistorico }) => {
      this.updateForm(carritoHistorico);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(carritoHistorico: ICarritoHistorico): void {
    this.editForm.patchValue({
      id: carritoHistorico.id,
      nombre: carritoHistorico.nombre,
      fechaAlta: carritoHistorico.fechaAlta,
      clienteId: carritoHistorico.clienteId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carritoHistorico = this.createFromForm();
    if (carritoHistorico.id !== undefined) {
      this.subscribeToSaveResponse(this.carritoHistoricoService.update(carritoHistorico));
    } else {
      this.subscribeToSaveResponse(this.carritoHistoricoService.create(carritoHistorico));
    }
  }

  private createFromForm(): ICarritoHistorico {
    return {
      ...new CarritoHistorico(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value,
      clienteId: this.editForm.get(['clienteId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarritoHistorico>>): void {
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

  trackById(index: number, item: ICliente): any {
    return item.id;
  }
}
