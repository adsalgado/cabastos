import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChat } from 'app/shared/model/chat.model';

@Component({
  selector: 'jhi-chat-detail',
  templateUrl: './chat-detail.component.html',
})
export class ChatDetailComponent implements OnInit {
  chat: IChat | null = null;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
protected activatedRoute: ActivatedRoute) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chat }) => (this.chat = chat));
  }

  previousState(): void {
    window.history.back();
  }
}
