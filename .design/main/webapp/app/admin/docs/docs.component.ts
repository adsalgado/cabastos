import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component } from '@angular/core';

@Component({
  selector: 'jhi-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['docs.scss'],
})
export class DocsComponent {constructor(public __elementSelectionService:ElementSelectionService,private __componentInspectorService:ComponentInspectorService) { this.__componentInspectorService.getComp(this); }}
