import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUsuarioImagen, UsuarioImagen } from 'app/shared/model/usuario-imagen.model';
import { UsuarioImagenService } from './usuario-imagen.service';
import { UsuarioImagenComponent } from './usuario-imagen.component';
import { UsuarioImagenDetailComponent } from './usuario-imagen-detail.component';
import { UsuarioImagenUpdateComponent } from './usuario-imagen-update.component';

@Injectable({ providedIn: 'root' })
export class UsuarioImagenResolve implements Resolve<IUsuarioImagen> {
  constructor(private service: UsuarioImagenService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarioImagen> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((usuarioImagen: HttpResponse<UsuarioImagen>) => {
          if (usuarioImagen.body) {
            return of(usuarioImagen.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UsuarioImagen());
  }
}

export const usuarioImagenRoute: Routes = [
  {
    path: '',
    component: UsuarioImagenComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.usuarioImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuarioImagenDetailComponent,
    resolve: {
      usuarioImagen: UsuarioImagenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.usuarioImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuarioImagenUpdateComponent,
    resolve: {
      usuarioImagen: UsuarioImagenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.usuarioImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuarioImagenUpdateComponent,
    resolve: {
      usuarioImagen: UsuarioImagenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.usuarioImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
