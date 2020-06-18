import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProveedor, Proveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from './proveedor.service';
import { ProveedorComponent } from './proveedor.component';
import { ProveedorDetailComponent } from './proveedor-detail.component';
import { ProveedorUpdateComponent } from './proveedor-update.component';

@Injectable({ providedIn: 'root' })
export class ProveedorResolve implements Resolve<IProveedor> {
  constructor(private service: ProveedorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProveedor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((proveedor: HttpResponse<Proveedor>) => {
          if (proveedor.body) {
            return of(proveedor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Proveedor());
  }
}

export const proveedorRoute: Routes = [
  {
    path: '',
    component: ProveedorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.proveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProveedorDetailComponent,
    resolve: {
      proveedor: ProveedorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.proveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProveedorUpdateComponent,
    resolve: {
      proveedor: ProveedorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.proveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProveedorUpdateComponent,
    resolve: {
      proveedor: ProveedorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.proveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
