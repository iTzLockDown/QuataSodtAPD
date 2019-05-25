import { Component, OnInit } from '@angular/core';
import {Delegados} from './delegados';
import {UdelegadoService} from './udelegado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-udelegados',
  templateUrl: './udelegados.component.html'
})
export class UdelegadosComponent implements OnInit {
  delegados: Delegados[];
  constructor(private delegadoService: UdelegadoService) { }

  ngOnInit() {
    this.delegadoService.getDelegados().subscribe(
      delegado => this.delegados = delegado
    );
  }
  delete(delegado: Delegados): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de eliminar?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar delegado.!'
    }).then((result) => {
      if (result.value) {
        this.delegadoService.delete(delegado.id).subscribe(
          response => {
            this.delegados = this.delegados.filter(depor => depor !== delegado)
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
