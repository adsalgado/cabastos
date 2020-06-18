import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOfertaProveedor, OfertaProveedor } from 'app/shared/model/oferta-proveedor.model';
import { OfertaProveedorService } from './oferta-proveedor.service';
import { OfertaProveedorComponent } from './oferta-proveedor.component';
import { OfertaProveedorDetailComponent } from './oferta-proveedor-detail.component';
import { OfertaProveedorUpdateComponent } from './oferta-proveedor-update.component';

@Injectable({ providedIn: 'root' })
export class OfertaProveedorResolve implements Resolve<IOfertaProveedor> {
  constructor(private service: OfertaProveedorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOfertaProveedor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ofertaProveedor: HttpResponse<OfertaProveedor>) => {
          if (ofertaProveedor.body) {
            return of(ofertaProveedor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OfertaProveedor());
  }
}

export const ofertaProveedorRoute: Routes = [
  {
    path: '',
    component: OfertaProveedorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.ofertaProveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OfertaProveedorDetailComponent,
    resolve: {
      ofertaProveedor: OfertaProveedorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.ofertaProveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OfertaProveedorUpdateComponent,
    resolve: {
      ofertaProveedor: OfertaProveedorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.ofertaProveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OfertaProveedorUpdateComponent,
    resolve: {
      ofertaProveedor: OfertaProveedorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.ofertaProveedor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
