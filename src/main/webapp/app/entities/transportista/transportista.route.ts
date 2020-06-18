import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransportista, Transportista } from 'app/shared/model/transportista.model';
import { TransportistaService } from './transportista.service';
import { TransportistaComponent } from './transportista.component';
import { TransportistaDetailComponent } from './transportista-detail.component';
import { TransportistaUpdateComponent } from './transportista-update.component';

@Injectable({ providedIn: 'root' })
export class TransportistaResolve implements Resolve<ITransportista> {
  constructor(private service: TransportistaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransportista> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transportista: HttpResponse<Transportista>) => {
          if (transportista.body) {
            return of(transportista.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Transportista());
  }
}

export const transportistaRoute: Routes = [
  {
    path: '',
    component: TransportistaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportista.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransportistaDetailComponent,
    resolve: {
      transportista: TransportistaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportista.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransportistaUpdateComponent,
    resolve: {
      transportista: TransportistaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportista.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransportistaUpdateComponent,
    resolve: {
      transportista: TransportistaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportista.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
