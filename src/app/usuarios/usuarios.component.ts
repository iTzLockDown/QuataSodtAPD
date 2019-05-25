import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }
  delete(usuario: Usuario): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de eliminar ${usuario.nombre} ${usuario.apellidop}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar Cliente!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(user => user !== usuario)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          });
      }
    });
  }


}

