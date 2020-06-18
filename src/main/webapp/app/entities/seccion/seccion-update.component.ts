import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISeccion, Seccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

@Component({
  selector: 'jhi-seccion-update',
  templateUrl: './seccion-update.component.html',
})
export class SeccionUpdateComponent implements OnInit {
  isSaving = false;
  empresas: IEmpresa[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(128)]],
    empresaId: [],
  });

  constructor(
    protected seccionService: SeccionService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seccion }) => {
      this.updateForm(seccion);

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(seccion: ISeccion): void {
    this.editForm.patchValue({
      id: seccion.id,
      nombre: seccion.nombre,
      empresaId: seccion.empresaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seccion = this.createFromForm();
    if (seccion.id !== undefined) {
      this.subscribeToSaveResponse(this.seccionService.update(seccion));
    } else {
      this.subscribeToSaveResponse(this.seccionService.create(seccion));
    }
  }

  private createFromForm(): ISeccion {
    return {
      ...new Seccion(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      empresaId: this.editForm.get(['empresaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeccion>>): void {
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
