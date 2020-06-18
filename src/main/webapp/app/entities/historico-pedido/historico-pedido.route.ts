import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoricoPedido, HistoricoPedido } from 'app/shared/model/historico-pedido.model';
import { HistoricoPedidoService } from './historico-pedido.service';
import { HistoricoPedidoComponent } from './historico-pedido.component';
import { HistoricoPedidoDetailComponent } from './historico-pedido-detail.component';
import { HistoricoPedidoUpdateComponent } from './historico-pedido-update.component';

@Injectable({ providedIn: 'root' })
export class HistoricoPedidoResolve implements Resolve<IHistoricoPedido> {
  constructor(private service: HistoricoPedidoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoricoPedido> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historicoPedido: HttpResponse<HistoricoPedido>) => {
          if (historicoPedido.body) {
            return of(historicoPedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoricoPedido());
  }
}

export const historicoPedidoRoute: Routes = [
  {
    path: '',
    component: HistoricoPedidoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.historicoPedido.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoricoPedidoDetailComponent,
    resolve: {
      historicoPedido: HistoricoPedidoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.historicoPedido.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoricoPedidoUpdateComponent,
    resolve: {
      historicoPedido: HistoricoPedidoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.historicoPedido.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoricoPedidoUpdateComponent,
    resolve: {
      historicoPedido: HistoricoPedidoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.historicoPedido.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
