import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPedido } from 'app/shared/model/pedido.model';

type EntityResponseType = HttpResponse<IPedido>;
type EntityArrayResponseType = HttpResponse<IPedido[]>;

@Injectable({ providedIn: 'root' })
export class PedidoService {
  public resourceUrl = SERVER_API_URL + 'api/pedidos';

  constructor(protected http: HttpClient) {}

  create(pedido: IPedido): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedido);
    return this.http
      .post<IPedido>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pedido: IPedido): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedido);
    return this.http
      .put<IPedido>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPedido[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pedido: IPedido): IPedido {
    const copy: IPedido = Object.assign({}, pedido, {
      fechaPedido: pedido.fechaPedido && pedido.fechaPedido.isValid() ? pedido.fechaPedido.format(DATE_FORMAT) : undefined,
      fechaPreparacion:
        pedido.fechaPreparacion && pedido.fechaPreparacion.isValid() ? pedido.fechaPreparacion.format(DATE_FORMAT) : undefined,
      fechaCobro: pedido.fechaCobro && pedido.fechaCobro.isValid() ? pedido.fechaCobro.format(DATE_FORMAT) : undefined,
      fechaEntrega: pedido.fechaEntrega && pedido.fechaEntrega.isValid() ? pedido.fechaEntrega.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPedido = res.body.fechaPedido ? moment(res.body.fechaPedido) : undefined;
      res.body.fechaPreparacion = res.body.fechaPreparacion ? moment(res.body.fechaPreparacion) : undefined;
      res.body.fechaCobro = res.body.fechaCobro ? moment(res.body.fechaCobro) : undefined;
      res.body.fechaEntrega = res.body.fechaEntrega ? moment(res.body.fechaEntrega) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pedido: IPedido) => {
        pedido.fechaPedido = pedido.fechaPedido ? moment(pedido.fechaPedido) : undefined;
        pedido.fechaPreparacion = pedido.fechaPreparacion ? moment(pedido.fechaPreparacion) : undefined;
        pedido.fechaCobro = pedido.fechaCobro ? moment(pedido.fechaCobro) : undefined;
        pedido.fechaEntrega = pedido.fechaEntrega ? moment(pedido.fechaEntrega) : undefined;
      });
    }
    return res;
  }
}
