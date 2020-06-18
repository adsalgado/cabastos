import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRecolector, Recolector } from 'app/shared/model/recolector.model';
import { RecolectorService } from './recolector.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

type SelectableEntity = IUser | IEmpresa;

@Component({
  selector: 'jhi-recolector-update',
  templateUrl: './recolector-update.component.html',
})
export class RecolectorUpdateComponent implements OnInit {
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

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected recolectorService: RecolectorService,
    protected userService: UserService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recolector }) => {
      if (!recolector.id) {
        const today = moment().startOf('day');
        recolector.fechaAlta = today;
        recolector.fechaModificacion = today;
      }

      this.updateForm(recolector);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(recolector: IRecolector): void {
    this.editForm.patchValue({
      id: recolector.id,
      nombre: recolector.nombre,
      fechaAlta: recolector.fechaAlta ? recolector.fechaAlta.format(DATE_TIME_FORMAT) : null,
      fechaModificacion: recolector.fechaModificacion ? recolector.fechaModificacion.format(DATE_TIME_FORMAT) : null,
      usuarioAltaId: recolector.usuarioAltaId,
      usuarioModificacionId: recolector.usuarioModificacionId,
      empresaId: recolector.empresaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recolector = this.createFromForm();
    if (recolector.id !== undefined) {
      this.subscribeToSaveResponse(this.recolectorService.update(recolector));
    } else {
      this.subscribeToSaveResponse(this.recolectorService.create(recolector));
    }
  }

  private createFromForm(): IRecolector {
    return {
      ...new Recolector(),
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecolector>>): void {
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
