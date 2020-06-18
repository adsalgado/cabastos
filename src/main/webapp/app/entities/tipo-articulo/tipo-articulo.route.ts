import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoArticulo, TipoArticulo } from 'app/shared/model/tipo-articulo.model';
import { TipoArticuloService } from './tipo-articulo.service';
import { TipoArticuloComponent } from './tipo-articulo.component';
import { TipoArticuloDetailComponent } from './tipo-articulo-detail.component';
import { TipoArticuloUpdateComponent } from './tipo-articulo-update.component';

@Injectable({ providedIn: 'root' })
export class TipoArticuloResolve implements Resolve<ITipoArticulo> {
  constructor(private service: TipoArticuloService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoArticulo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoArticulo: HttpResponse<TipoArticulo>) => {
          if (tipoArticulo.body) {
            return of(tipoArticulo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoArticulo());
  }
}

export const tipoArticuloRoute: Routes = [
  {
    path: '',
    component: TipoArticuloComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoArticulo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoArticuloDetailComponent,
    resolve: {
      tipoArticulo: TipoArticuloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoArticulo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoArticuloUpdateComponent,
    resolve: {
      tipoArticulo: TipoArticuloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoArticulo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoArticuloUpdateComponent,
    resolve: {
      tipoArticulo: TipoArticuloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoArticulo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
