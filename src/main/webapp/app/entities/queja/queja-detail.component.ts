import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQueja } from 'app/shared/model/queja.model';

@Component({
  selector: 'jhi-queja-detail',
  templateUrl: './queja-detail.component.html',
})
export class QuejaDetailComponent implements OnInit {
  queja: IQueja | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ queja }) => (this.queja = queja));
  }

  previousState(): void {
    window.history.back();
  }
}
