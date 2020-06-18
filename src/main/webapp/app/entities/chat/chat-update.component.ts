import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IChat, Chat } from 'app/shared/model/chat.model';
import { ChatService } from './chat.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from 'app/entities/adjunto/adjunto.service';

type SelectableEntity = IUser | IAdjunto;

@Component({
  selector: 'jhi-chat-update',
  templateUrl: './chat-update.component.html',
})
export class ChatUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  adjuntos: IAdjunto[] = [];

  editForm = this.fb.group({
    id: [],
    mensaje: [null, [Validators.required, Validators.maxLength(512)]],
    fecha: [null, [Validators.required]],
    usuarioFuenteId: [],
    usuarioDestinoId: [],
    adjuntoId: [],
  });

  constructor(
    protected chatService: ChatService,
    protected userService: UserService,
    protected adjuntoService: AdjuntoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chat }) => {
      if (!chat.id) {
        const today = moment().startOf('day');
        chat.fecha = today;
      }

      this.updateForm(chat);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.adjuntoService.query().subscribe((res: HttpResponse<IAdjunto[]>) => (this.adjuntos = res.body || []));
    });
  }

  updateForm(chat: IChat): void {
    this.editForm.patchValue({
      id: chat.id,
      mensaje: chat.mensaje,
      fecha: chat.fecha ? chat.fecha.format(DATE_TIME_FORMAT) : null,
      usuarioFuenteId: chat.usuarioFuenteId,
      usuarioDestinoId: chat.usuarioDestinoId,
      adjuntoId: chat.adjuntoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chat = this.createFromForm();
    if (chat.id !== undefined) {
      this.subscribeToSaveResponse(this.chatService.update(chat));
    } else {
      this.subscribeToSaveResponse(this.chatService.create(chat));
    }
  }

  private createFromForm(): IChat {
    return {
      ...new Chat(),
      id: this.editForm.get(['id'])!.value,
      mensaje: this.editForm.get(['mensaje'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      usuarioFuenteId: this.editForm.get(['usuarioFuenteId'])!.value,
      usuarioDestinoId: this.editForm.get(['usuarioDestinoId'])!.value,
      adjuntoId: this.editForm.get(['adjuntoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChat>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
