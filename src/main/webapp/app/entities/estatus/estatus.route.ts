import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstatus, Estatus } from 'app/shared/model/estatus.model';
import { EstatusService } from './estatus.service';
import { EstatusComponent } from './estatus.component';
import { EstatusDetailComponent } from './estatus-detail.component';
import { EstatusUpdateComponent } from './estatus-update.component';

@Injectable({ providedIn: 'root' })
export class EstatusResolve implements Resolve<IEstatus> {
  constructor(private service: EstatusService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstatus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estatus: HttpResponse<Estatus>) => {
          if (estatus.body) {
            return of(estatus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Estatus());
  }
}

export const estatusRoute: Routes = [
  {
    path: '',
    component: EstatusComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.estatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstatusDetailComponent,
    resolve: {
      estatus: EstatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.estatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstatusUpdateComponent,
    resolve: {
      estatus: EstatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.estatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstatusUpdateComponent,
    resolve: {
      estatus: EstatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.estatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
