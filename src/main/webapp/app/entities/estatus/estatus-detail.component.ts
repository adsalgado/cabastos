import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstatus } from 'app/shared/model/estatus.model';

@Component({
  selector: 'jhi-estatus-detail',
  templateUrl: './estatus-detail.component.html',
})
export class EstatusDetailComponent implements OnInit {
  estatus: IEstatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estatus }) => (this.estatus = estatus));
  }

  previousState(): void {
    window.history.back();
  }
}
