import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Sponsor} from './sponsor';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()
export class SponsorService {

  private urlEndPoint: string = 'http://localhost:8081/api/sponsor';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,
              private router: Router) { }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Sponsor[])
    );
  }
  create(sponsor: Sponsor): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, sponsor, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  getSponsor(id): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/sponsor']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  update(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.urlEndPoint}/${sponsor.id}`, sponsor, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Sponsor> {
    return this.http.delete<Sponsor>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
