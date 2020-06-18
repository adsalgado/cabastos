import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITarjeta, Tarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from './tarjeta.service';
import { TarjetaComponent } from './tarjeta.component';
import { TarjetaDetailComponent } from './tarjeta-detail.component';
import { TarjetaUpdateComponent } from './tarjeta-update.component';

@Injectable({ providedIn: 'root' })
export class TarjetaResolve implements Resolve<ITarjeta> {
  constructor(private service: TarjetaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITarjeta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tarjeta: HttpResponse<Tarjeta>) => {
          if (tarjeta.body) {
            return of(tarjeta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tarjeta());
  }
}

export const tarjetaRoute: Routes = [
  {
    path: '',
    component: TarjetaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tarjeta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TarjetaDetailComponent,
    resolve: {
      tarjeta: TarjetaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tarjeta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TarjetaUpdateComponent,
    resolve: {
      tarjeta: TarjetaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tarjeta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TarjetaUpdateComponent,
    resolve: {
      tarjeta: TarjetaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tarjeta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
