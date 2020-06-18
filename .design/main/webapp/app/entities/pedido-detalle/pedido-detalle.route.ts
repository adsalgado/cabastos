import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPedidoDetalle, PedidoDetalle } from 'app/shared/model/pedido-detalle.model';
import { PedidoDetalleService } from './pedido-detalle.service';
import { PedidoDetalleComponent } from './pedido-detalle.component';
import { PedidoDetalleDetailComponent } from './pedido-detalle-detail.component';
import { PedidoDetalleUpdateComponent } from './pedido-detalle-update.component';

@Injectable({ providedIn: 'root' })
export class PedidoDetalleResolve implements Resolve<IPedidoDetalle> {
  constructor(private service: PedidoDetalleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPedidoDetalle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pedidoDetalle: HttpResponse<PedidoDetalle>) => {
          if (pedidoDetalle.body) {
            return of(pedidoDetalle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PedidoDetalle());
  }
}

export const pedidoDetalleRoute: Routes = [
  {
    path: '',
    component: PedidoDetalleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pedidoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PedidoDetalleDetailComponent,
    resolve: {
      pedidoDetalle: PedidoDetalleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pedidoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PedidoDetalleUpdateComponent,
    resolve: {
      pedidoDetalle: PedidoDetalleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pedidoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PedidoDetalleUpdateComponent,
    resolve: {
      pedidoDetalle: PedidoDetalleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.pedidoDetalle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
