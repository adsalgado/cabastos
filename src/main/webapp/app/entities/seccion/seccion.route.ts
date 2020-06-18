import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISeccion, Seccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';
import { SeccionComponent } from './seccion.component';
import { SeccionDetailComponent } from './seccion-detail.component';
import { SeccionUpdateComponent } from './seccion-update.component';

@Injectable({ providedIn: 'root' })
export class SeccionResolve implements Resolve<ISeccion> {
  constructor(private service: SeccionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeccion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((seccion: HttpResponse<Seccion>) => {
          if (seccion.body) {
            return of(seccion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Seccion());
  }
}

export const seccionRoute: Routes = [
  {
    path: '',
    component: SeccionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.seccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeccionDetailComponent,
    resolve: {
      seccion: SeccionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.seccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeccionUpdateComponent,
    resolve: {
      seccion: SeccionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.seccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeccionUpdateComponent,
    resolve: {
      seccion: SeccionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.seccion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
