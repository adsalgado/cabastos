import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRecolector, Recolector } from 'app/shared/model/recolector.model';
import { RecolectorService } from './recolector.service';
import { RecolectorComponent } from './recolector.component';
import { RecolectorDetailComponent } from './recolector-detail.component';
import { RecolectorUpdateComponent } from './recolector-update.component';

@Injectable({ providedIn: 'root' })
export class RecolectorResolve implements Resolve<IRecolector> {
  constructor(private service: RecolectorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecolector> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((recolector: HttpResponse<Recolector>) => {
          if (recolector.body) {
            return of(recolector.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recolector());
  }
}

export const recolectorRoute: Routes = [
  {
    path: '',
    component: RecolectorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolector.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RecolectorDetailComponent,
    resolve: {
      recolector: RecolectorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolector.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RecolectorUpdateComponent,
    resolve: {
      recolector: RecolectorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolector.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RecolectorUpdateComponent,
    resolve: {
      recolector: RecolectorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.recolector.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
