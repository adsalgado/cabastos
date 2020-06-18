import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecolector } from 'app/shared/model/recolector.model';

@Component({
  selector: 'jhi-recolector-detail',
  templateUrl: './recolector-detail.component.html',
})
export class RecolectorDetailComponent implements OnInit {
  recolector: IRecolector | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recolector }) => (this.recolector = recolector));
  }

  previousState(): void {
    window.history.back();
  }
}
