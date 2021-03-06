import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQueja } from 'app/shared/model/queja.model';

type EntityResponseType = HttpResponse<IQueja>;
type EntityArrayResponseType = HttpResponse<IQueja[]>;

@Injectable({ providedIn: 'root' })
export class QuejaService {
  public resourceUrl = SERVER_API_URL + 'api/quejas';

  constructor(protected http: HttpClient) {}

  create(queja: IQueja): Observable<EntityResponseType> {
    return this.http.post<IQueja>(this.resourceUrl, queja, { observe: 'response' });
  }

  update(queja: IQueja): Observable<EntityResponseType> {
    return this.http.put<IQueja>(this.resourceUrl, queja, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQueja>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQueja[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
