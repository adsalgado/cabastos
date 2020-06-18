import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransportista, Transportista } from 'app/shared/model/transportista.model';
import { TransportistaService } from './transportista.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

type SelectableEntity = IUser | IEmpresa;

@Component({
  selector: 'jhi-transportista-update',
  templateUrl: './transportista-update.component.html',
})
export class TransportistaUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  empresas: IEmpresa[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
    fechaAlta: [],
    fechaModificacion: [],
    usuarioAltaId: [],
    usuarioModificacionId: [],
    empresaId: [],
  });

  constructor(
    protected transportistaService: TransportistaService,
    protected userService: UserService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transportista }) => {
      if (!transportista.id) {
        const today = moment().startOf('day');
        transportista.fechaAlta = today;
        transportista.fechaModificacion = today;
      }

      this.updateForm(transportista);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(transportista: ITransportista): void {
    this.editForm.patchValue({
      id: transportista.id,
      nombre: transportista.nombre,
      fechaAlta: transportista.fechaAlta ? transportista.fechaAlta.format(DATE_TIME_FORMAT) : null,
      fechaModificacion: transportista.fechaModificacion ? transportista.fechaModificacion.format(DATE_TIME_FORMAT) : null,
      usuarioAltaId: transportista.usuarioAltaId,
      usuarioModificacionId: transportista.usuarioModificacionId,
      empresaId: transportista.empresaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transportista = this.createFromForm();
    if (transportista.id !== undefined) {
      this.subscribeToSaveResponse(this.transportistaService.update(transportista));
    } else {
      this.subscribeToSaveResponse(this.transportistaService.create(transportista));
    }
  }

  private createFromForm(): ITransportista {
    return {
      ...new Transportista(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value ? moment(this.editForm.get(['fechaAlta'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaModificacion: this.editForm.get(['fechaModificacion'])!.value
        ? moment(this.editForm.get(['fechaModificacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      usuarioAltaId: this.editForm.get(['usuarioAltaId'])!.value,
      usuarioModificacionId: this.editForm.get(['usuarioModificacionId'])!.value,
      empresaId: this.editForm.get(['empresaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportista>>): void {
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
