import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from 'app/entities/estatus/estatus.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

type SelectableEntity = IUser | IEstatus | IEmpresa;

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html',
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  estatuses: IEstatus[] = [];
  empresas: IEmpresa[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
    apellidoPaterno: [null, [Validators.required, Validators.maxLength(128)]],
    email: [null, [Validators.required, Validators.maxLength(128)]],
    telefono: [null, [Validators.required, Validators.maxLength(10)]],
    fechaAlta: [],
    fechaModificacion: [],
    usuarioAltaId: [],
    usuarioModificacionId: [],
    estatusId: [],
    empresaId: [],
  });

  constructor(
    protected clienteService: ClienteService,
    protected userService: UserService,
    protected estatusService: EstatusService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (!cliente.id) {
        const today = moment().startOf('day');
        cliente.fechaAlta = today;
        cliente.fechaModificacion = today;
      }

      this.updateForm(cliente);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.estatusService.query().subscribe((res: HttpResponse<IEstatus[]>) => (this.estatuses = res.body || []));

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      nombre: cliente.nombre,
      apellidoPaterno: cliente.apellidoPaterno,
      email: cliente.email,
      telefono: cliente.telefono,
      fechaAlta: cliente.fechaAlta ? cliente.fechaAlta.format(DATE_TIME_FORMAT) : null,
      fechaModificacion: cliente.fechaModificacion ? cliente.fechaModificacion.format(DATE_TIME_FORMAT) : null,
      usuarioAltaId: cliente.usuarioAltaId,
      usuarioModificacionId: cliente.usuarioModificacionId,
      estatusId: cliente.estatusId,
      empresaId: cliente.empresaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellidoPaterno: this.editForm.get(['apellidoPaterno'])!.value,
      email: this.editForm.get(['email'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value ? moment(this.editForm.get(['fechaAlta'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaModificacion: this.editForm.get(['fechaModificacion'])!.value
        ? moment(this.editForm.get(['fechaModificacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      usuarioAltaId: this.editForm.get(['usuarioAltaId'])!.value,
      usuarioModificacionId: this.editForm.get(['usuarioModificacionId'])!.value,
      estatusId: this.editForm.get(['estatusId'])!.value,
      empresaId: this.editForm.get(['empresaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
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
