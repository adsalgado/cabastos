import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITarjeta, Tarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from './tarjeta.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-tarjeta-update',
  templateUrl: './tarjeta-update.component.html',
})
export class TarjetaUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  fechaAltaDp: any;

  editForm = this.fb.group({
    id: [],
    numeroTarjeta: [null, [Validators.required, Validators.maxLength(20)]],
    fechaCaducidad: [null, [Validators.required, Validators.maxLength(10)]],
    numeroSeguridad: [null, [Validators.required, Validators.maxLength(3)]],
    fechaAlta: [null, [Validators.required]],
    clienteId: [],
  });

  constructor(
    protected tarjetaService: TarjetaService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarjeta }) => {
      this.updateForm(tarjeta);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(tarjeta: ITarjeta): void {
    this.editForm.patchValue({
      id: tarjeta.id,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaCaducidad: tarjeta.fechaCaducidad,
      numeroSeguridad: tarjeta.numeroSeguridad,
      fechaAlta: tarjeta.fechaAlta,
      clienteId: tarjeta.clienteId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarjeta = this.createFromForm();
    if (tarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.tarjetaService.update(tarjeta));
    } else {
      this.subscribeToSaveResponse(this.tarjetaService.create(tarjeta));
    }
  }

  private createFromForm(): ITarjeta {
    return {
      ...new Tarjeta(),
      id: this.editForm.get(['id'])!.value,
      numeroTarjeta: this.editForm.get(['numeroTarjeta'])!.value,
      fechaCaducidad: this.editForm.get(['fechaCaducidad'])!.value,
      numeroSeguridad: this.editForm.get(['numeroSeguridad'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value,
      clienteId: this.editForm.get(['clienteId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarjeta>>): void {
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
