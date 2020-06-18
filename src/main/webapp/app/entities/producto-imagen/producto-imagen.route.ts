import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductoImagen, ProductoImagen } from 'app/shared/model/producto-imagen.model';
import { ProductoImagenService } from './producto-imagen.service';
import { ProductoImagenComponent } from './producto-imagen.component';
import { ProductoImagenDetailComponent } from './producto-imagen-detail.component';
import { ProductoImagenUpdateComponent } from './producto-imagen-update.component';

@Injectable({ providedIn: 'root' })
export class ProductoImagenResolve implements Resolve<IProductoImagen> {
  constructor(private service: ProductoImagenService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductoImagen> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productoImagen: HttpResponse<ProductoImagen>) => {
          if (productoImagen.body) {
            return of(productoImagen.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductoImagen());
  }
}

export const productoImagenRoute: Routes = [
  {
    path: '',
    component: ProductoImagenComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.productoImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductoImagenDetailComponent,
    resolve: {
      productoImagen: ProductoImagenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.productoImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductoImagenUpdateComponent,
    resolve: {
      productoImagen: ProductoImagenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.productoImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductoImagenUpdateComponent,
    resolve: {
      productoImagen: ProductoImagenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'abastosApp.productoImagen.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
