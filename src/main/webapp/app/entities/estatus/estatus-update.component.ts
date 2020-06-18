import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEstatus, Estatus } from 'app/shared/model/estatus.model';
import { EstatusService } from './estatus.service';

@Component({
  selector: 'jhi-estatus-update',
  templateUrl: './estatus-update.component.html',
})
export class EstatusUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipoEstatus: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
  });

  constructor(protected estatusService: EstatusService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estatus }) => {
      this.updateForm(estatus);
    });
  }

  updateForm(estatus: IEstatus): void {
    this.editForm.patchValue({
      id: estatus.id,
      tipoEstatus: estatus.tipoEstatus,
      nombre: estatus.nombre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estatus = this.createFromForm();
    if (estatus.id !== undefined) {
      this.subscribeToSaveResponse(this.estatusService.update(estatus));
    } else {
      this.subscribeToSaveResponse(this.estatusService.create(estatus));
    }
  }

  private createFromForm(): IEstatus {
    return {
      ...new Estatus(),
      id: this.editForm.get(['id'])!.value,
      tipoEstatus: this.editForm.get(['tipoEstatus'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstatus>>): void {
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
}
