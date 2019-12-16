import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfessor } from 'app/shared/model/professor.model';

type EntityResponseType = HttpResponse<IProfessor>;
type EntityArrayResponseType = HttpResponse<IProfessor[]>;

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  public resourceUrl = SERVER_API_URL + 'api/professors';

  constructor(protected http: HttpClient) {}

  create(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .post<IProfessor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .put<IProfessor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfessor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfessor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(professor: IProfessor): IProfessor {
    const copy: IProfessor = Object.assign({}, professor, {
      birthdate: professor.birthdate != null && professor.birthdate.isValid() ? professor.birthdate.format(DATE_FORMAT) : null,
      hiringDate: professor.hiringDate != null && professor.hiringDate.isValid() ? professor.hiringDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthdate = res.body.birthdate != null ? moment(res.body.birthdate) : null;
      res.body.hiringDate = res.body.hiringDate != null ? moment(res.body.hiringDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((professor: IProfessor) => {
        professor.birthdate = professor.birthdate != null ? moment(professor.birthdate) : null;
        professor.hiringDate = professor.hiringDate != null ? moment(professor.hiringDate) : null;
      });
    }
    return res;
  }
}
