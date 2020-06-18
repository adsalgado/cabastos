import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQueja, Queja } from 'app/shared/model/queja.model';
import { QuejaService } from './queja.service';

@Component({
  selector: 'jhi-queja-update',
  templateUrl: './queja-update.component.html',
})
export class QuejaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected quejaService: QuejaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ queja }) => {
      this.updateForm(queja);
    });
  }

  updateForm(queja: IQueja): void {
    this.editForm.patchValue({
      id: queja.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const queja = this.createFromForm();
    if (queja.id !== undefined) {
      this.subscribeToSaveResponse(this.quejaService.update(queja));
    } else {
      this.subscribeToSaveResponse(this.quejaService.create(queja));
    }
  }

  private createFromForm(): IQueja {
    return {
      ...new Queja(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQueja>>): void {
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
