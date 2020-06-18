import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRecolectorTarifa, RecolectorTarifa } from 'app/shared/model/recolector-tarifa.model';
import { RecolectorTarifaService } from './recolector-tarifa.service';
import { IRecolector } from 'app/shared/model/recolector.model';
import { RecolectorService } from 'app/entities/recolector/recolector.service';

@Component({
  selector: 'jhi-recolector-tarifa-update',
  templateUrl: './recolector-tarifa-update.component.html',
})
export class RecolectorTarifaUpdateComponent implements OnInit {
  isSaving = false;
  recolectors: IRecolector[] = [];

  editForm = this.fb.group({
    id: [],
    rangoMinimo: [null, [Validators.required]],
    rangoMaximo: [null, [Validators.required]],
    precio: [null, [Validators.required]],
    recolectorId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected recolectorTarifaService: RecolectorTarifaService,
    protected recolectorService: RecolectorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recolectorTarifa }) => {
      this.updateForm(recolectorTarifa);

      this.recolectorService.query().subscribe((res: HttpResponse<IRecolector[]>) => (this.recolectors = res.body || []));
    });
  }

  updateForm(recolectorTarifa: IRecolectorTarifa): void {
    this.editForm.patchValue({
      id: recolectorTarifa.id,
      rangoMinimo: recolectorTarifa.rangoMinimo,
      rangoMaximo: recolectorTarifa.rangoMaximo,
      precio: recolectorTarifa.precio,
      recolectorId: recolectorTarifa.recolectorId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recolectorTarifa = this.createFromForm();
    if (recolectorTarifa.id !== undefined) {
      this.subscribeToSaveResponse(this.recolectorTarifaService.update(recolectorTarifa));
    } else {
      this.subscribeToSaveResponse(this.recolectorTarifaService.create(recolectorTarifa));
    }
  }

  private createFromForm(): IRecolectorTarifa {
    return {
      ...new RecolectorTarifa(),
      id: this.editForm.get(['id'])!.value,
      rangoMinimo: this.editForm.get(['rangoMinimo'])!.value,
      rangoMaximo: this.editForm.get(['rangoMaximo'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      recolectorId: this.editForm.get(['recolectorId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecolectorTarifa>>): void {
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

  trackById(index: number, item: IRecolector): any {
    return item.id;
  }
}
