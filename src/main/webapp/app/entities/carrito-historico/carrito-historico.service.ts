import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICarritoHistorico } from 'app/shared/model/carrito-historico.model';

type EntityResponseType = HttpResponse<ICarritoHistorico>;
type EntityArrayResponseType = HttpResponse<ICarritoHistorico[]>;

@Injectable({ providedIn: 'root' })
export class CarritoHistoricoService {
  public resourceUrl = SERVER_API_URL + 'api/carrito-historicos';

  constructor(protected http: HttpClient) {}

  create(carritoHistorico: ICarritoHistorico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carritoHistorico);
    return this.http
      .post<ICarritoHistorico>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(carritoHistorico: ICarritoHistorico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carritoHistorico);
    return this.http
      .put<ICarritoHistorico>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICarritoHistorico>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICarritoHistorico[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(carritoHistorico: ICarritoHistorico): ICarritoHistorico {
    const copy: ICarritoHistorico = Object.assign({}, carritoHistorico, {
      fechaAlta:
        carritoHistorico.fechaAlta && carritoHistorico.fechaAlta.isValid() ? carritoHistorico.fechaAlta.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaAlta = res.body.fechaAlta ? moment(res.body.fechaAlta) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((carritoHistorico: ICarritoHistorico) => {
        carritoHistorico.fechaAlta = carritoHistorico.fechaAlta ? moment(carritoHistorico.fechaAlta) : undefined;
      });
    }
    return res;
  }
}
