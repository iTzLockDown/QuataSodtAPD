import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Delegados} from './delegados';

@Injectable({
  providedIn: 'root'
})
export class UdelegadoService {
  private urlEndPoint: string = 'http://localhost:8081/api/usuarioDelegados';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getDelegados(): Observable<Delegados[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Delegados[])
    );
  }
  create(delegado: Delegados): Observable<Delegados> {
    return this.http.post<Delegados>(this.urlEndPoint, delegado, {headers: this.httpHeaders});
  }
  getDelegado(id): Observable<Delegados> {
    return this.http.get<Delegados>(`${this.urlEndPoint}/${id}`);
  }
  update(delegado: Delegados): Observable<Delegados> {
    return this.http.put<Delegados>(`${this.urlEndPoint}/${delegado.id}`, delegado, {headers: this.httpHeaders});
  }
  delete(id: number): Observable<Delegados> {
    return this.http.delete<Delegados>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
