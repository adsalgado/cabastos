import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransportistaTarifa, TransportistaTarifa } from 'app/shared/model/transportista-tarifa.model';
import { TransportistaTarifaService } from './transportista-tarifa.service';
import { TransportistaTarifaComponent } from './transportista-tarifa.component';
import { TransportistaTarifaDetailComponent } from './transportista-tarifa-detail.component';
import { TransportistaTarifaUpdateComponent } from './transportista-tarifa-update.component';

@Injectable({ providedIn: 'root' })
export class TransportistaTarifaResolve implements Resolve<ITransportistaTarifa> {
  constructor(private service: TransportistaTarifaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransportistaTarifa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transportistaTarifa: HttpResponse<TransportistaTarifa>) => {
          if (transportistaTarifa.body) {
            return of(transportistaTarifa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TransportistaTarifa());
  }
}

export const transportistaTarifaRoute: Routes = [
  {
    path: '',
    component: TransportistaTarifaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportistaTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransportistaTarifaDetailComponent,
    resolve: {
      transportistaTarifa: TransportistaTarifaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportistaTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransportistaTarifaUpdateComponent,
    resolve: {
      transportistaTarifa: TransportistaTarifaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportistaTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransportistaTarifaUpdateComponent,
    resolve: {
      transportistaTarifa: TransportistaTarifaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.transportistaTarifa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
