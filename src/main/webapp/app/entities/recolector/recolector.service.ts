import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRecolector } from 'app/shared/model/recolector.model';

type EntityResponseType = HttpResponse<IRecolector>;
type EntityArrayResponseType = HttpResponse<IRecolector[]>;

@Injectable({ providedIn: 'root' })
export class RecolectorService {
  public resourceUrl = SERVER_API_URL + 'api/recolectors';

  constructor(protected http: HttpClient) {}

  create(recolector: IRecolector): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recolector);
    return this.http
      .post<IRecolector>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(recolector: IRecolector): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recolector);
    return this.http
      .put<IRecolector>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRecolector>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRecolector[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(recolector: IRecolector): IRecolector {
    const copy: IRecolector = Object.assign({}, recolector, {
      fechaAlta: recolector.fechaAlta && recolector.fechaAlta.isValid() ? recolector.fechaAlta.toJSON() : undefined,
      fechaModificacion:
        recolector.fechaModificacion && recolector.fechaModificacion.isValid() ? recolector.fechaModificacion.toJSON() : undefined,
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
      res.body.forEach((recolector: IRecolector) => {
        recolector.fechaAlta = recolector.fechaAlta ? moment(recolector.fechaAlta) : undefined;
        recolector.fechaModificacion = recolector.fechaModificacion ? moment(recolector.fechaModificacion) : undefined;
      });
    }
    return res;
  }
}
