import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoOferta } from 'app/shared/model/tipo-oferta.model';

@Component({
  selector: 'jhi-tipo-oferta-detail',
  templateUrl: './tipo-oferta-detail.component.html',
})
export class TipoOfertaDetailComponent implements OnInit {
  tipoOferta: ITipoOferta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoOferta }) => (this.tipoOferta = tipoOferta));
  }

  previousState(): void {
    window.history.back();
  }
}
