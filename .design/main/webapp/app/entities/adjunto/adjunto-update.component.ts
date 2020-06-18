import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAdjunto, Adjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from './adjunto.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-adjunto-update',
  templateUrl: './adjunto-update.component.html',
})
export class AdjuntoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    contentType: [null, [Validators.maxLength(128)]],
    size: [],
    fileName: [null, [Validators.maxLength(128)]],
    file: [],
    fileContentType: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected adjuntoService: AdjuntoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adjunto }) => {
      this.updateForm(adjunto);
    });
  }

  updateForm(adjunto: IAdjunto): void {
    this.editForm.patchValue({
      id: adjunto.id,
      contentType: adjunto.contentType,
      size: adjunto.size,
      fileName: adjunto.fileName,
      file: adjunto.file,
      fileContentType: adjunto.fileContentType,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('abastosApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adjunto = this.createFromForm();
    if (adjunto.id !== undefined) {
      this.subscribeToSaveResponse(this.adjuntoService.update(adjunto));
    } else {
      this.subscribeToSaveResponse(this.adjuntoService.create(adjunto));
    }
  }

  private createFromForm(): IAdjunto {
    return {
      ...new Adjunto(),
      id: this.editForm.get(['id'])!.value,
      contentType: this.editForm.get(['contentType'])!.value,
      size: this.editForm.get(['size'])!.value,
      fileName: this.editForm.get(['fileName'])!.value,
      fileContentType: this.editForm.get(['fileContentType'])!.value,
      file: this.editForm.get(['file'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdjunto>>): void {
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
