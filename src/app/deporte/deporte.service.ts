import { Injectable } from '@angular/core';
import { Deporte } from './deporte';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class DeporteService {
  private urlEndPoint: string = 'http://localhost:8081/api/deporte';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getDeportes(): Observable<Deporte[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response1 => response1 as Deporte[])
    );
  }
  create(deporte: Deporte): Observable<Deporte> {
    return this.http.post<Deporte>(this.urlEndPoint, deporte, {headers: this.httpHeaders});
  }
  getDeporte(id): Observable<Deporte> {
    return this.http.get<Deporte>(`${this.urlEndPoint}/${id}`);
  }
  update(deporte: Deporte): Observable<Deporte> {
    return this.http.put<Deporte>(`${this.urlEndPoint}/${deporte.id}`, deporte, {headers: this.httpHeaders});
  }
  delete(id: number): Observable<Deporte> {
    return this.http.delete<Deporte>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

}
