import { Component, OnInit } from '@angular/core';
import { Deporte} from './deporte';
import { DeporteService } from './deporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.component.html',
})
export class DeporteComponent implements OnInit {
  deportes: Deporte[];
  constructor(private deporteService: DeporteService) {}

  ngOnInit() {
    this.deporteService.getDeportes().subscribe(
      deportes => this.deportes = deportes
    );
  }
  delete(deporte: Deporte): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de eliminar ${deporte.nombre} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar deporte!'
    }).then((result) => {
      if (result.value) {
        this.deporteService.delete(deporte.id).subscribe(
          response => {
            this.deportes = this.deportes.filter(depor => depor !== deporte)
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
