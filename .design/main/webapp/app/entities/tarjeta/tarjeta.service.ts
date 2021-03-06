import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITarjeta } from 'app/shared/model/tarjeta.model';

type EntityResponseType = HttpResponse<ITarjeta>;
type EntityArrayResponseType = HttpResponse<ITarjeta[]>;

@Injectable({ providedIn: 'root' })
export class TarjetaService {
  public resourceUrl = SERVER_API_URL + 'api/tarjetas';

  constructor(protected http: HttpClient) {}

  create(tarjeta: ITarjeta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarjeta);
    return this.http
      .post<ITarjeta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tarjeta: ITarjeta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarjeta);
    return this.http
      .put<ITarjeta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITarjeta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITarjeta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tarjeta: ITarjeta): ITarjeta {
    const copy: ITarjeta = Object.assign({}, tarjeta, {
      fechaAlta: tarjeta.fechaAlta && tarjeta.fechaAlta.isValid() ? tarjeta.fechaAlta.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((tarjeta: ITarjeta) => {
        tarjeta.fechaAlta = tarjeta.fechaAlta ? moment(tarjeta.fechaAlta) : undefined;
      });
    }
    return res;
  }
}
