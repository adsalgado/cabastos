import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDireccion, Direccion } from 'app/shared/model/direccion.model';
import { DireccionService } from './direccion.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-direccion-update',
  templateUrl: './direccion-update.component.html',
})
export class DireccionUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    direccion: [null, [Validators.required, Validators.maxLength(256)]],
    colonia: [null, [Validators.maxLength(100)]],
    codigoPostal: [null, [Validators.maxLength(5)]],
    geolocalizacion: [null, [Validators.maxLength(128)]],
    clienteId: [],
  });

  constructor(
    protected direccionService: DireccionService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direccion }) => {
      this.updateForm(direccion);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(direccion: IDireccion): void {
    this.editForm.patchValue({
      id: direccion.id,
      direccion: direccion.direccion,
      colonia: direccion.colonia,
      codigoPostal: direccion.codigoPostal,
      geolocalizacion: direccion.geolocalizacion,
      clienteId: direccion.clienteId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const direccion = this.createFromForm();
    if (direccion.id !== undefined) {
      this.subscribeToSaveResponse(this.direccionService.update(direccion));
    } else {
      this.subscribeToSaveResponse(this.direccionService.create(direccion));
    }
  }

  private createFromForm(): IDireccion {
    return {
      ...new Direccion(),
      id: this.editForm.get(['id'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      colonia: this.editForm.get(['colonia'])!.value,
      codigoPostal: this.editForm.get(['codigoPostal'])!.value,
      geolocalizacion: this.editForm.get(['geolocalizacion'])!.value,
      clienteId: this.editForm.get(['clienteId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDireccion>>): void {
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
