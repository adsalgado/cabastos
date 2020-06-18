import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUsuarioImagen, UsuarioImagen } from 'app/shared/model/usuario-imagen.model';
import { UsuarioImagenService } from './usuario-imagen.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from 'app/entities/adjunto/adjunto.service';

type SelectableEntity = IUser | IAdjunto;

@Component({
  selector: 'jhi-usuario-imagen-update',
  templateUrl: './usuario-imagen-update.component.html',
})
export class UsuarioImagenUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  adjuntos: IAdjunto[] = [];

  editForm = this.fb.group({
    id: [],
    fechaAlta: [],
    usuarioId: [],
    adjuntoId: [],
  });

  constructor(
    protected usuarioImagenService: UsuarioImagenService,
    protected userService: UserService,
    protected adjuntoService: AdjuntoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioImagen }) => {
      if (!usuarioImagen.id) {
        const today = moment().startOf('day');
        usuarioImagen.fechaAlta = today;
      }

      this.updateForm(usuarioImagen);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.adjuntoService.query().subscribe((res: HttpResponse<IAdjunto[]>) => (this.adjuntos = res.body || []));
    });
  }

  updateForm(usuarioImagen: IUsuarioImagen): void {
    this.editForm.patchValue({
      id: usuarioImagen.id,
      fechaAlta: usuarioImagen.fechaAlta ? usuarioImagen.fechaAlta.format(DATE_TIME_FORMAT) : null,
      usuarioId: usuarioImagen.usuarioId,
      adjuntoId: usuarioImagen.adjuntoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarioImagen = this.createFromForm();
    if (usuarioImagen.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioImagenService.update(usuarioImagen));
    } else {
      this.subscribeToSaveResponse(this.usuarioImagenService.create(usuarioImagen));
    }
  }

  private createFromForm(): IUsuarioImagen {
    return {
      ...new UsuarioImagen(),
      id: this.editForm.get(['id'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value ? moment(this.editForm.get(['fechaAlta'])!.value, DATE_TIME_FORMAT) : undefined,
      usuarioId: this.editForm.get(['usuarioId'])!.value,
      adjuntoId: this.editForm.get(['adjuntoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioImagen>>): void {
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
