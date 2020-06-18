import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParametrosAplicacion, ParametrosAplicacion } from 'app/shared/model/parametros-aplicacion.model';
import { ParametrosAplicacionService } from './parametros-aplicacion.service';
import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from 'app/entities/adjunto/adjunto.service';

@Component({
  selector: 'jhi-parametros-aplicacion-update',
  templateUrl: './parametros-aplicacion-update.component.html',
})
export class ParametrosAplicacionUpdateComponent implements OnInit {
  isSaving = false;
  adjuntos: IAdjunto[] = [];

  editForm = this.fb.group({
    id: [],
    clave: [null, [Validators.required, Validators.maxLength(128)]],
    descripcion: [null, [Validators.maxLength(256)]],
    adjuntoId: [],
  });

  constructor(
    protected parametrosAplicacionService: ParametrosAplicacionService,
    protected adjuntoService: AdjuntoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametrosAplicacion }) => {
      this.updateForm(parametrosAplicacion);

      this.adjuntoService.query().subscribe((res: HttpResponse<IAdjunto[]>) => (this.adjuntos = res.body || []));
    });
  }

  updateForm(parametrosAplicacion: IParametrosAplicacion): void {
    this.editForm.patchValue({
      id: parametrosAplicacion.id,
      clave: parametrosAplicacion.clave,
      descripcion: parametrosAplicacion.descripcion,
      adjuntoId: parametrosAplicacion.adjuntoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parametrosAplicacion = this.createFromForm();
    if (parametrosAplicacion.id !== undefined) {
      this.subscribeToSaveResponse(this.parametrosAplicacionService.update(parametrosAplicacion));
    } else {
      this.subscribeToSaveResponse(this.parametrosAplicacionService.create(parametrosAplicacion));
    }
  }

  private createFromForm(): IParametrosAplicacion {
    return {
      ...new ParametrosAplicacion(),
      id: this.editForm.get(['id'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      adjuntoId: this.editForm.get(['adjuntoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParametrosAplicacion>>): void {
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

  trackById(index: number, item: IAdjunto): any {
    return item.id;
  }
}
