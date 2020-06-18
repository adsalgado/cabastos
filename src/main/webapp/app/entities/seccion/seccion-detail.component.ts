import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeccion } from 'app/shared/model/seccion.model';

@Component({
  selector: 'jhi-seccion-detail',
  templateUrl: './seccion-detail.component.html',
})
export class SeccionDetailComponent implements OnInit {
  seccion: ISeccion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seccion }) => (this.seccion = seccion));
  }

  previousState(): void {
    window.history.back();
  }
}
