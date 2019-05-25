import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import {of, Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';
import {Perfileusuario} from '../perfilesusuarios/perfileusuario';

@Injectable()
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8081/api/usuarios';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,
              private router: Router) { }

  getPerfil(): Observable<Perfileusuario[]> {
    return this.http.get<Perfileusuario[]>(this.urlEndPoint + '/perfiles');
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }
  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  update(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }


}
