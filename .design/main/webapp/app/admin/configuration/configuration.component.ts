import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';

import { ConfigurationService, Bean, PropertySource } from './configuration.service';

@Component({
  selector: 'jhi-configuration',
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent implements OnInit {
  constructor(public __elementSelectionService:ElementSelectionService,private __componentInspectorService:ComponentInspectorService) { this.__componentInspectorService.getComp(this); }allBeans!: Bean[];
  beans: Bean[] = [];
  beansFilter = '';
  beansAscending = true;
  propertySources: PropertySource[] = [];

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.getBeans().subscribe(beans => {
      this.allBeans = beans;
      this.filterAndSortBeans();
    });

    this.configurationService.getPropertySources().subscribe(propertySources => (this.propertySources = propertySources));
  }

  filterAndSortBeans(): void {
    this.beans = this.allBeans
      .filter(bean => !this.beansFilter || bean.prefix.toLowerCase().includes(this.beansFilter.toLowerCase()))
      .sort((a, b) => (a.prefix < b.prefix ? (this.beansAscending ? -1 : 1) : this.beansAscending ? 1 : -1));
  }
}
