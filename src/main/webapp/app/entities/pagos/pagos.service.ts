import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPagos } from 'app/shared/model/pagos.model';

type EntityResponseType = HttpResponse<IPagos>;
type EntityArrayResponseType = HttpResponse<IPagos[]>;

@Injectable({ providedIn: 'root' })
export class PagosService {
  public resourceUrl = SERVER_API_URL + 'api/pagos';

  constructor(protected http: HttpClient) {}

  create(pagos: IPagos): Observable<EntityResponseType> {
    return this.http.post<IPagos>(this.resourceUrl, pagos, { observe: 'response' });
  }

  update(pagos: IPagos): Observable<EntityResponseType> {
    return this.http.put<IPagos>(this.resourceUrl, pagos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
