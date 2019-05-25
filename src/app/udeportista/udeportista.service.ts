import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Deportistas} from './deportistas';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UdeportistaService {
  private urlEndPoint: string = 'http://localhost:8081/api/usuarioDeportista';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getDeportistas(): Observable<Deportistas[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Deportistas[])
    );
  }
  create(deportista: Deportistas): Observable<Deportistas> {
    return this.http.post<Deportistas>(this.urlEndPoint, deportista, {headers: this.httpHeaders});
  }
  getDeportista(id): Observable<Deportistas> {
    return this.http.get<Deportistas>(`${this.urlEndPoint}/${id}`);
  }
  update(deportista: Deportistas): Observable<Deportistas> {
    return this.http.put<Deportistas>(`${this.urlEndPoint}/${deportista.id}`, deportista, {headers: this.httpHeaders});
  }
  delete(id: number): Observable<Deportistas> {
    return this.http.delete<Deportistas>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

}
