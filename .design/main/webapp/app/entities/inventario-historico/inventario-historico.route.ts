import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInventarioHistorico, InventarioHistorico } from 'app/shared/model/inventario-historico.model';
import { InventarioHistoricoService } from './inventario-historico.service';
import { InventarioHistoricoComponent } from './inventario-historico.component';
import { InventarioHistoricoDetailComponent } from './inventario-historico-detail.component';
import { InventarioHistoricoUpdateComponent } from './inventario-historico-update.component';

@Injectable({ providedIn: 'root' })
export class InventarioHistoricoResolve implements Resolve<IInventarioHistorico> {
  constructor(private service: InventarioHistoricoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInventarioHistorico> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inventarioHistorico: HttpResponse<InventarioHistorico>) => {
          if (inventarioHistorico.body) {
            return of(inventarioHistorico.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InventarioHistorico());
  }
}

export const inventarioHistoricoRoute: Routes = [
  {
    path: '',
    component: InventarioHistoricoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventarioHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InventarioHistoricoDetailComponent,
    resolve: {
      inventarioHistorico: InventarioHistoricoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventarioHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InventarioHistoricoUpdateComponent,
    resolve: {
      inventarioHistorico: InventarioHistoricoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventarioHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InventarioHistoricoUpdateComponent,
    resolve: {
      inventarioHistorico: InventarioHistoricoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventarioHistorico.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
