import { Component, OnInit } from '@angular/core';
import {Deportistas} from './deportistas';
import {UdeportistaService} from './udeportista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-udeportista',
  templateUrl: './udeportista.component.html'
})
export class UdeportistaComponent implements OnInit {
  deportistas: Deportistas[];
  constructor(private deportistaService: UdeportistaService) { }

  ngOnInit() {
    this.deportistaService.getDeportistas().subscribe(
      deportistas => this.deportistas = deportistas
    );
  }
  delete(deportista: Deportistas): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de eliminar el registro?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar deporte!'
    }).then((result) => {
      if (result.value) {
        this.deportistaService.delete(deportista.id).subscribe(
          response => {
            this.deportistas = this.deportistas.filter(depor => depor !== deportista)
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
