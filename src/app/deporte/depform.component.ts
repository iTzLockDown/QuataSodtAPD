import { Component, OnInit } from '@angular/core';
import {Deporte} from './deporte';
import {DeporteService} from './deporte.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-depform',
  templateUrl: './depform.component.html',
})
export class DepformComponent implements OnInit {
  private deportes: Deporte = new Deporte();
  private titulo = 'Formulario de Deportes';
  constructor(private deporteService: DeporteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarDeporte();
  }
  cargarDeporte(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.deporteService.getDeporte(id).subscribe(
            (deportes) => this.deportes = deportes);
        }
      });
  }

  public create(): void {
    this.deporteService.create(this.deportes)
      .subscribe(
        deporte => {
          this.router.navigate(['/deportes'])
          Swal.fire('Nuevo Deporte', `Deporte ${deporte.nombre} creado con exito!`, 'success'); }
      );
  }
  update(): void {
    this.deporteService.update(this.deportes).subscribe(deporte => {
        this.router.navigate(['/deportes'])
        Swal.fire('Deporte Actualizado', `Cliente ${deporte.nombre} actualizado con exito!`, 'success');
      }
    );
  }

}
