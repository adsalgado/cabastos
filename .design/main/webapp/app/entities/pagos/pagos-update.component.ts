import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPagos, Pagos } from 'app/shared/model/pagos.model';
import { PagosService } from './pagos.service';

@Component({
  selector: 'jhi-pagos-update',
  templateUrl: './pagos-update.component.html',
})
export class PagosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected pagosService: PagosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagos }) => {
      this.updateForm(pagos);
    });
  }

  updateForm(pagos: IPagos): void {
    this.editForm.patchValue({
      id: pagos.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pagos = this.createFromForm();
    if (pagos.id !== undefined) {
      this.subscribeToSaveResponse(this.pagosService.update(pagos));
    } else {
      this.subscribeToSaveResponse(this.pagosService.create(pagos));
    }
  }

  private createFromForm(): IPagos {
    return {
      ...new Pagos(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagos>>): void {
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
