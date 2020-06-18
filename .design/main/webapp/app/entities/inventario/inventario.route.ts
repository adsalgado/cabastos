import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInventario, Inventario } from 'app/shared/model/inventario.model';
import { InventarioService } from './inventario.service';
import { InventarioComponent } from './inventario.component';
import { InventarioDetailComponent } from './inventario-detail.component';
import { InventarioUpdateComponent } from './inventario-update.component';

@Injectable({ providedIn: 'root' })
export class InventarioResolve implements Resolve<IInventario> {
  constructor(private service: InventarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInventario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inventario: HttpResponse<Inventario>) => {
          if (inventario.body) {
            return of(inventario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Inventario());
  }
}

export const inventarioRoute: Routes = [
  {
    path: '',
    component: InventarioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InventarioDetailComponent,
    resolve: {
      inventario: InventarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InventarioUpdateComponent,
    resolve: {
      inventario: InventarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InventarioUpdateComponent,
    resolve: {
      inventario: InventarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.inventario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
