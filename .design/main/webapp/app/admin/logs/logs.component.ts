import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';

import { Log, LoggersResponse, Logger, Level } from './log.model';
import { LogsService } from './logs.service';

@Component({
  selector: 'jhi-logs',
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {
  loggers?: Log[];
  filter = '';
  orderProp = 'name';
  reverse = false;

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
private logsService: LogsService) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.findAndExtractLoggers();
  }

  changeLevel(name: string, level: Level): void {
    this.logsService.changeLevel(name, level).subscribe(() => this.findAndExtractLoggers());
  }

  private findAndExtractLoggers(): void {
    this.logsService
      .findAll()
      .subscribe(
        (response: LoggersResponse) =>
          (this.loggers = Object.entries(response.loggers).map((logger: [string, Logger]) => new Log(logger[0], logger[1].effectiveLevel)))
      );
  }
}
