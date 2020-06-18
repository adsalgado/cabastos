import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProveedor } from 'app/shared/model/proveedor.model';

type EntityResponseType = HttpResponse<IProveedor>;
type EntityArrayResponseType = HttpResponse<IProveedor[]>;

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  public resourceUrl = SERVER_API_URL + 'api/proveedors';

  constructor(protected http: HttpClient) {}

  create(proveedor: IProveedor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proveedor);
    return this.http
      .post<IProveedor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(proveedor: IProveedor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proveedor);
    return this.http
      .put<IProveedor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProveedor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProveedor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(proveedor: IProveedor): IProveedor {
    const copy: IProveedor = Object.assign({}, proveedor, {
      fechaAlta: proveedor.fechaAlta && proveedor.fechaAlta.isValid() ? proveedor.fechaAlta.toJSON() : undefined,
      fechaModificacion:
        proveedor.fechaModificacion && proveedor.fechaModificacion.isValid() ? proveedor.fechaModificacion.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaAlta = res.body.fechaAlta ? moment(res.body.fechaAlta) : undefined;
      res.body.fechaModificacion = res.body.fechaModificacion ? moment(res.body.fechaModificacion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((proveedor: IProveedor) => {
        proveedor.fechaAlta = proveedor.fechaAlta ? moment(proveedor.fechaAlta) : undefined;
        proveedor.fechaModificacion = proveedor.fechaModificacion ? moment(proveedor.fechaModificacion) : undefined;
      });
    }
    return res;
  }
}
