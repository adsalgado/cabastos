import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportista } from 'app/shared/model/transportista.model';

@Component({
  selector: 'jhi-transportista-detail',
  templateUrl: './transportista-detail.component.html',
})
export class TransportistaDetailComponent implements OnInit {
  transportista: ITransportista | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transportista }) => (this.transportista = transportista));
  }

  previousState(): void {
    window.history.back();
  }
}
