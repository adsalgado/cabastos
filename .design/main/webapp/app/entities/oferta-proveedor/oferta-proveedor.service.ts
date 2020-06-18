import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOfertaProveedor } from 'app/shared/model/oferta-proveedor.model';

type EntityResponseType = HttpResponse<IOfertaProveedor>;
type EntityArrayResponseType = HttpResponse<IOfertaProveedor[]>;

@Injectable({ providedIn: 'root' })
export class OfertaProveedorService {
  public resourceUrl = SERVER_API_URL + 'api/oferta-proveedors';

  constructor(protected http: HttpClient) {}

  create(ofertaProveedor: IOfertaProveedor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ofertaProveedor);
    return this.http
      .post<IOfertaProveedor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ofertaProveedor: IOfertaProveedor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ofertaProveedor);
    return this.http
      .put<IOfertaProveedor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOfertaProveedor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOfertaProveedor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ofertaProveedor: IOfertaProveedor): IOfertaProveedor {
    const copy: IOfertaProveedor = Object.assign({}, ofertaProveedor, {
      fechaInicio:
        ofertaProveedor.fechaInicio && ofertaProveedor.fechaInicio.isValid() ? ofertaProveedor.fechaInicio.format(DATE_FORMAT) : undefined,
      fechaFin: ofertaProveedor.fechaFin && ofertaProveedor.fechaFin.isValid() ? ofertaProveedor.fechaFin.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio ? moment(res.body.fechaInicio) : undefined;
      res.body.fechaFin = res.body.fechaFin ? moment(res.body.fechaFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ofertaProveedor: IOfertaProveedor) => {
        ofertaProveedor.fechaInicio = ofertaProveedor.fechaInicio ? moment(ofertaProveedor.fechaInicio) : undefined;
        ofertaProveedor.fechaFin = ofertaProveedor.fechaFin ? moment(ofertaProveedor.fechaFin) : undefined;
      });
    }
    return res;
  }
}
