import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Perfileusuario} from '../perfilesusuarios/perfileusuario';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private usuarios: Usuario = new Usuario();
  perfilesUser: Perfileusuario[];
  private titulo = 'Formulario de Usuario Cliente';
  private errores: string[];
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.usuarioService.getPerfil().subscribe((perfilUsuario) => this.perfilesUser = perfilUsuario);
  }
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
            this.usuarioService.getUsuario(id).subscribe(
              (usuarios) => this.usuarios = usuarios);
          }
      });
  }

  public create(): void {
    this.usuarioService.create(this.usuarios)
      .subscribe(
      json => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Nuevo Usuario ', `${json.mensaje}: ${json.usuario.nombre}`, 'success'); },
        err => {
            this.errores = err.error.errors as string[];
        }
    );
  }
  update(): void {
    this.usuarioService.update(this.usuarios)
      .subscribe(json => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
      },
        err => {
          this.errores = err.error.errors as string[];
        }
    );
  }

  compararPerfil(obj1: Perfileusuario, obj2: Perfileusuario): boolean {
    if (obj1 === undefined && obj2 === undefined) {
      return true;
    }
    return obj1 == null || obj2 == null ? false : obj1.id === obj2.id;
  }
}
