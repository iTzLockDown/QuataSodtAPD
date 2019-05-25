import { Component, OnInit } from '@angular/core';
import {Deportistas} from './deportistas';
import {ActivatedRoute, Router} from '@angular/router';
import {UdeportistaService} from './udeportista.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-udepform',
  templateUrl: './udepform.component.html'
})
export class UdepformComponent implements OnInit {
  private deportistas: Deportistas = new Deportistas();
  private titulo = 'Formulario de Deportistas';
  constructor(private deportistaService: UdeportistaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarDeportista();
  }
  cargarDeportista(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.deportistaService.getDeportista(id).subscribe(
            (deportista) => this.deportistas = deportista);
        }
      });
  }

  public create(): void {
    this.deportistaService.create(this.deportistas)
      .subscribe(
        deportista => {
          this.router.navigate(['/deportistas'])
          Swal.fire('Nuevo Usuario Deportista', `Deportista creado con exito!`, 'success'); }
      );
  }
  update(): void {
    this.deportistaService.update(this.deportistas).subscribe(deportista => {
        this.router.navigate(['/deportistas'])
        Swal.fire('Deportista Actualizado', `Deportista actualizado con exito!`, 'success');
      }
    );
  }


}
