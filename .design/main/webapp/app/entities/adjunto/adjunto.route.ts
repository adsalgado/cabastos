import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdjunto, Adjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from './adjunto.service';
import { AdjuntoComponent } from './adjunto.component';
import { AdjuntoDetailComponent } from './adjunto-detail.component';
import { AdjuntoUpdateComponent } from './adjunto-update.component';

@Injectable({ providedIn: 'root' })
export class AdjuntoResolve implements Resolve<IAdjunto> {
  constructor(private service: AdjuntoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdjunto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adjunto: HttpResponse<Adjunto>) => {
          if (adjunto.body) {
            return of(adjunto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Adjunto());
  }
}

export const adjuntoRoute: Routes = [
  {
    path: '',
    component: AdjuntoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.adjunto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdjuntoDetailComponent,
    resolve: {
      adjunto: AdjuntoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.adjunto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdjuntoUpdateComponent,
    resolve: {
      adjunto: AdjuntoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.adjunto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdjuntoUpdateComponent,
    resolve: {
      adjunto: AdjuntoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.adjunto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
