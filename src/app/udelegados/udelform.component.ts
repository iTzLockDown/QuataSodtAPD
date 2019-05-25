import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Delegados} from './delegados';
import {UdelegadoService} from './udelegado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-udelform',
  templateUrl: './udelform.component.html',
})
export class UdelformComponent implements OnInit {
  private delegados: Delegados = new Delegados();
  private titulo = 'Formulario de Delegados';
  constructor(private delegadoService: UdelegadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.cargarDelegado();
  }
  cargarDelegado(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.delegadoService.getDelegado(id).subscribe(
            (delegados) => this.delegados = delegados);
        }
      });
  }

  public create(): void {
    this.delegadoService.create(this.delegados)
      .subscribe(
        delegados => {
          this.router.navigate(['/delegados'])
          Swal.fire('Nuevo delegado', `Delegado creado con exito!`, 'success'); }
      );
  }
  update(): void {
    this.delegadoService.update(this.delegados).subscribe(delegados => {
        this.router.navigate(['/delegados'])
        Swal.fire('Delegado Actualizado', `delegado actualizado con exito!`, 'success');
      }
    );
  }

}
