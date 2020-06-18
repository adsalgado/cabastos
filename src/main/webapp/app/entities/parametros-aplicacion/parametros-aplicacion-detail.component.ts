import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParametrosAplicacion } from 'app/shared/model/parametros-aplicacion.model';

@Component({
  selector: 'jhi-parametros-aplicacion-detail',
  templateUrl: './parametros-aplicacion-detail.component.html',
})
export class ParametrosAplicacionDetailComponent implements OnInit {
  parametrosAplicacion: IParametrosAplicacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametrosAplicacion }) => (this.parametrosAplicacion = parametrosAplicacion));
  }

  previousState(): void {
    window.history.back();
  }
}
