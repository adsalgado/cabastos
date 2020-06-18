import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnidadMedida, UnidadMedida } from 'app/shared/model/unidad-medida.model';
import { UnidadMedidaService } from './unidad-medida.service';
import { UnidadMedidaComponent } from './unidad-medida.component';
import { UnidadMedidaDetailComponent } from './unidad-medida-detail.component';
import { UnidadMedidaUpdateComponent } from './unidad-medida-update.component';

@Injectable({ providedIn: 'root' })
export class UnidadMedidaResolve implements Resolve<IUnidadMedida> {
  constructor(private service: UnidadMedidaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnidadMedida> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unidadMedida: HttpResponse<UnidadMedida>) => {
          if (unidadMedida.body) {
            return of(unidadMedida.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnidadMedida());
  }
}

export const unidadMedidaRoute: Routes = [
  {
    path: '',
    component: UnidadMedidaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.unidadMedida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnidadMedidaDetailComponent,
    resolve: {
      unidadMedida: UnidadMedidaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.unidadMedida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnidadMedidaUpdateComponent,
    resolve: {
      unidadMedida: UnidadMedidaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.unidadMedida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnidadMedidaUpdateComponent,
    resolve: {
      unidadMedida: UnidadMedidaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.unidadMedida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
