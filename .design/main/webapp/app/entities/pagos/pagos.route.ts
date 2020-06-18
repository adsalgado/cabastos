import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPagos, Pagos } from 'app/shared/model/pagos.model';
import { PagosService } from './pagos.service';
import { PagosComponent } from './pagos.component';
import { PagosDetailComponent } from './pagos-detail.component';
import { PagosUpdateComponent } from './pagos-update.component';

@Injectable({ providedIn: 'root' })
export class PagosResolve implements Resolve<IPagos> {
  constructor(private service: PagosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pagos: HttpResponse<Pagos>) => {
          if (pagos.body) {
            return of(pagos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pagos());
  }
}

export const pagosRoute: Routes = [
  {
    path: '',
    component: PagosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pagos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PagosDetailComponent,
    resolve: {
      pagos: PagosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pagos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PagosUpdateComponent,
    resolve: {
      pagos: PagosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pagos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PagosUpdateComponent,
    resolve: {
      pagos: PagosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pagos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
