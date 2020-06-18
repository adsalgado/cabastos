import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarritoHistoricoDetalle, CarritoHistoricoDetalle } from 'app/shared/model/carrito-historico-detalle.model';
import { CarritoHistoricoDetalleService } from './carrito-historico-detalle.service';
import { CarritoHistoricoDetalleComponent } from './carrito-historico-detalle.component';
import { CarritoHistoricoDetalleDetailComponent } from './carrito-historico-detalle-detail.component';
import { CarritoHistoricoDetalleUpdateComponent } from './carrito-historico-detalle-update.component';

@Injectable({ providedIn: 'root' })
export class CarritoHistoricoDetalleResolve implements Resolve<ICarritoHistoricoDetalle> {
  constructor(private service: CarritoHistoricoDetalleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarritoHistoricoDetalle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carritoHistoricoDetalle: HttpResponse<CarritoHistoricoDetalle>) => {
          if (carritoHistoricoDetalle.body) {
            return of(carritoHistoricoDetalle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarritoHistoricoDetalle());
  }
}

export const carritoHistoricoDetalleRoute: Routes = [
  {
    path: '',
    component: CarritoHistoricoDetalleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistoricoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CarritoHistoricoDetalleDetailComponent,
    resolve: {
      carritoHistoricoDetalle: CarritoHistoricoDetalleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistoricoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CarritoHistoricoDetalleUpdateComponent,
    resolve: {
      carritoHistoricoDetalle: CarritoHistoricoDetalleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistoricoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CarritoHistoricoDetalleUpdateComponent,
    resolve: {
      carritoHistoricoDetalle: CarritoHistoricoDetalleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoHistoricoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
