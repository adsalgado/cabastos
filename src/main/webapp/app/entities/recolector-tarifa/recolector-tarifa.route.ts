import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRecolectorTarifa, RecolectorTarifa } from 'app/shared/model/recolector-tarifa.model';
import { RecolectorTarifaService } from './recolector-tarifa.service';
import { RecolectorTarifaComponent } from './recolector-tarifa.component';
import { RecolectorTarifaDetailComponent } from './recolector-tarifa-detail.component';
import { RecolectorTarifaUpdateComponent } from './recolector-tarifa-update.component';

@Injectable({ providedIn: 'root' })
export class RecolectorTarifaResolve implements Resolve<IRecolectorTarifa> {
  constructor(private service: RecolectorTarifaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecolectorTarifa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((recolectorTarifa: HttpResponse<RecolectorTarifa>) => {
          if (recolectorTarifa.body) {
            return of(recolectorTarifa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RecolectorTarifa());
  }
}

export const recolectorTarifaRoute: Routes = [
  {
    path: '',
    component: RecolectorTarifaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolectorTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RecolectorTarifaDetailComponent,
    resolve: {
      recolectorTarifa: RecolectorTarifaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolectorTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RecolectorTarifaUpdateComponent,
    resolve: {
      recolectorTarifa: RecolectorTarifaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolectorTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RecolectorTarifaUpdateComponent,
    resolve: {
      recolectorTarifa: RecolectorTarifaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolectorTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
