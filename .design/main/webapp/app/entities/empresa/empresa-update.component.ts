import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmpresa, Empresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'jhi-empresa-update',
  templateUrl: './empresa-update.component.html',
})
export class EmpresaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(256)]],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected empresaService: EmpresaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empresa }) => {
      this.updateForm(empresa);
    });
  }

  updateForm(empresa: IEmpresa): void {
    this.editForm.patchValue({
      id: empresa.id,
      nombre: empresa.nombre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empresa = this.createFromForm();
    if (empresa.id !== undefined) {
      this.subscribeToSaveResponse(this.empresaService.update(empresa));
    } else {
      this.subscribeToSaveResponse(this.empresaService.create(empresa));
    }
  }

  private createFromForm(): IEmpresa {
    return {
      ...new Empresa(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpresa>>): void {
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
