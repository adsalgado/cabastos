import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarritoHistorico, CarritoHistorico } from 'app/shared/model/carrito-historico.model';
import { CarritoHistoricoService } from './carrito-historico.service';
import { CarritoHistoricoComponent } from './carrito-historico.component';
import { CarritoHistoricoDetailComponent } from './carrito-historico-detail.component';
import { CarritoHistoricoUpdateComponent } from './carrito-historico-update.component';

@Injectable({ providedIn: 'root' })
export class CarritoHistoricoResolve implements Resolve<ICarritoHistorico> {
  constructor(private service: CarritoHistoricoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarritoHistorico> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carritoHistorico: HttpResponse<CarritoHistorico>) => {
          if (carritoHistorico.body) {
            return of(carritoHistorico.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarritoHistorico());
  }
}

export const carritoHistoricoRoute: Routes = [
  {
    path: '',
    component: CarritoHistoricoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CarritoHistoricoDetailComponent,
    resolve: {
      carritoHistorico: CarritoHistoricoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CarritoHistoricoUpdateComponent,
    resolve: {
      carritoHistorico: CarritoHistoricoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CarritoHistoricoUpdateComponent,
    resolve: {
      carritoHistorico: CarritoHistoricoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
