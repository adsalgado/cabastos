import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarritoCompra, CarritoCompra } from 'app/shared/model/carrito-compra.model';
import { CarritoCompraService } from './carrito-compra.service';
import { CarritoCompraComponent } from './carrito-compra.component';
import { CarritoCompraDetailComponent } from './carrito-compra-detail.component';
import { CarritoCompraUpdateComponent } from './carrito-compra-update.component';

@Injectable({ providedIn: 'root' })
export class CarritoCompraResolve implements Resolve<ICarritoCompra> {
  constructor(private service: CarritoCompraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarritoCompra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carritoCompra: HttpResponse<CarritoCompra>) => {
          if (carritoCompra.body) {
            return of(carritoCompra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarritoCompra());
  }
}

export const carritoCompraRoute: Routes = [
  {
    path: '',
    component: CarritoCompraComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoCompra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CarritoCompraDetailComponent,
    resolve: {
      carritoCompra: CarritoCompraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoCompra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CarritoCompraUpdateComponent,
    resolve: {
      carritoCompra: CarritoCompraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoCompra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CarritoCompraUpdateComponent,
    resolve: {
      carritoCompra: CarritoCompraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.carritoCompra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
