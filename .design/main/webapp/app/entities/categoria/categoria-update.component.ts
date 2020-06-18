import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICategoria, Categoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

@Component({
  selector: 'jhi-categoria-update',
  templateUrl: './categoria-update.component.html',
})
export class CategoriaUpdateComponent implements OnInit {
  isSaving = false;
  empresas: IEmpresa[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
    empresaId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected categoriaService: CategoriaService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoria }) => {
      this.updateForm(categoria);

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(categoria: ICategoria): void {
    this.editForm.patchValue({
      id: categoria.id,
      nombre: categoria.nombre,
      empresaId: categoria.empresaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categoria = this.createFromForm();
    if (categoria.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaService.update(categoria));
    } else {
      this.subscribeToSaveResponse(this.categoriaService.create(categoria));
    }
  }

  private createFromForm(): ICategoria {
    return {
      ...new Categoria(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      empresaId: this.editForm.get(['empresaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoria>>): void {
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

  trackById(index: number, item: IEmpresa): any {
    return item.id;
  }
}
