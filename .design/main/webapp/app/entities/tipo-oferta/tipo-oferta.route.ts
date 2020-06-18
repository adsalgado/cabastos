import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoOferta, TipoOferta } from 'app/shared/model/tipo-oferta.model';
import { TipoOfertaService } from './tipo-oferta.service';
import { TipoOfertaComponent } from './tipo-oferta.component';
import { TipoOfertaDetailComponent } from './tipo-oferta-detail.component';
import { TipoOfertaUpdateComponent } from './tipo-oferta-update.component';

@Injectable({ providedIn: 'root' })
export class TipoOfertaResolve implements Resolve<ITipoOferta> {
  constructor(private service: TipoOfertaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoOferta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoOferta: HttpResponse<TipoOferta>) => {
          if (tipoOferta.body) {
            return of(tipoOferta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoOferta());
  }
}

export const tipoOfertaRoute: Routes = [
  {
    path: '',
    component: TipoOfertaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoOferta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoOfertaDetailComponent,
    resolve: {
      tipoOferta: TipoOfertaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoOferta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoOfertaUpdateComponent,
    resolve: {
      tipoOferta: TipoOfertaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoOferta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoOfertaUpdateComponent,
    resolve: {
      tipoOferta: TipoOfertaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.tipoOferta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
