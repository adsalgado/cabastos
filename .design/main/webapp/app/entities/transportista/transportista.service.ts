import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransportista } from 'app/shared/model/transportista.model';

type EntityResponseType = HttpResponse<ITransportista>;
type EntityArrayResponseType = HttpResponse<ITransportista[]>;

@Injectable({ providedIn: 'root' })
export class TransportistaService {
  public resourceUrl = SERVER_API_URL + 'api/transportistas';

  constructor(protected http: HttpClient) {}

  create(transportista: ITransportista): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transportista);
    return this.http
      .post<ITransportista>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transportista: ITransportista): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transportista);
    return this.http
      .put<ITransportista>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransportista>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransportista[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transportista: ITransportista): ITransportista {
    const copy: ITransportista = Object.assign({}, transportista, {
      fechaAlta: transportista.fechaAlta && transportista.fechaAlta.isValid() ? transportista.fechaAlta.toJSON() : undefined,
      fechaModificacion:
        transportista.fechaModificacion && transportista.fechaModificacion.isValid() ? transportista.fechaModificacion.toJSON() : undefined,
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
      res.body.forEach((transportista: ITransportista) => {
        transportista.fechaAlta = transportista.fechaAlta ? moment(transportista.fechaAlta) : undefined;
        transportista.fechaModificacion = transportista.fechaModificacion ? moment(transportista.fechaModificacion) : undefined;
      });
    }
    return res;
  }
}
