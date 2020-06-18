import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQueja, Queja } from 'app/shared/model/queja.model';
import { QuejaService } from './queja.service';
import { QuejaComponent } from './queja.component';
import { QuejaDetailComponent } from './queja-detail.component';
import { QuejaUpdateComponent } from './queja-update.component';

@Injectable({ providedIn: 'root' })
export class QuejaResolve implements Resolve<IQueja> {
  constructor(private service: QuejaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQueja> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((queja: HttpResponse<Queja>) => {
          if (queja.body) {
            return of(queja.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Queja());
  }
}

export const quejaRoute: Routes = [
  {
    path: '',
    component: QuejaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.queja.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuejaDetailComponent,
    resolve: {
      queja: QuejaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.queja.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuejaUpdateComponent,
    resolve: {
      queja: QuejaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.queja.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuejaUpdateComponent,
    resolve: {
      queja: QuejaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.queja.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
