import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAdjunto } from 'app/shared/model/adjunto.model';

@Component({
  selector: 'jhi-adjunto-detail',
  templateUrl: './adjunto-detail.component.html',
})
export class AdjuntoDetailComponent implements OnInit {
  adjunto: IAdjunto | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adjunto }) => (this.adjunto = adjunto));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
