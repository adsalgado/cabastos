import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParametrosAplicacion, ParametrosAplicacion } from 'app/shared/model/parametros-aplicacion.model';
import { ParametrosAplicacionService } from './parametros-aplicacion.service';
import { ParametrosAplicacionComponent } from './parametros-aplicacion.component';
import { ParametrosAplicacionDetailComponent } from './parametros-aplicacion-detail.component';
import { ParametrosAplicacionUpdateComponent } from './parametros-aplicacion-update.component';

@Injectable({ providedIn: 'root' })
export class ParametrosAplicacionResolve implements Resolve<IParametrosAplicacion> {
  constructor(private service: ParametrosAplicacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParametrosAplicacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((parametrosAplicacion: HttpResponse<ParametrosAplicacion>) => {
          if (parametrosAplicacion.body) {
            return of(parametrosAplicacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParametrosAplicacion());
  }
}

export const parametrosAplicacionRoute: Routes = [
  {
    path: '',
    component: ParametrosAplicacionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.parametrosAplicacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParametrosAplicacionDetailComponent,
    resolve: {
      parametrosAplicacion: ParametrosAplicacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.parametrosAplicacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParametrosAplicacionUpdateComponent,
    resolve: {
      parametrosAplicacion: ParametrosAplicacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.parametrosAplicacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParametrosAplicacionUpdateComponent,
    resolve: {
      parametrosAplicacion: ParametrosAplicacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.parametrosAplicacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
