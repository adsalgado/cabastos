import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChat } from 'app/shared/model/chat.model';
import { ChatService } from './chat.service';

@Component({
  templateUrl: './chat-delete-dialog.component.html',
})
export class ChatDeleteDialogComponent {
  chat?: IChat;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected chatService: ChatService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {this.__componentInspectorService.getComp(this);
}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chatService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chatListModification');
      this.activeModal.close();
    });
  }
}
