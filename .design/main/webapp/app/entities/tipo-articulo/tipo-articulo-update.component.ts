import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoArticulo, TipoArticulo } from 'app/shared/model/tipo-articulo.model';
import { TipoArticuloService } from './tipo-articulo.service';

@Component({
  selector: 'jhi-tipo-articulo-update',
  templateUrl: './tipo-articulo-update.component.html',
})
export class TipoArticuloUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected tipoArticuloService: TipoArticuloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoArticulo }) => {
      this.updateForm(tipoArticulo);
    });
  }

  updateForm(tipoArticulo: ITipoArticulo): void {
    this.editForm.patchValue({
      id: tipoArticulo.id,
      nombre: tipoArticulo.nombre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoArticulo = this.createFromForm();
    if (tipoArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoArticuloService.update(tipoArticulo));
    } else {
      this.subscribeToSaveResponse(this.tipoArticuloService.create(tipoArticulo));
    }
  }

  private createFromForm(): ITipoArticulo {
    return {
      ...new TipoArticulo(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoArticulo>>): void {
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
