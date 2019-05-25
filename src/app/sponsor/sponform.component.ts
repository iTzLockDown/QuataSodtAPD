import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Sponsor} from './sponsor';
import {SponsorService} from './sponsor.service';

@Component({
  selector: 'app-sponform',
  templateUrl: './sponform.component.html'
})
export class SponformComponent implements OnInit {

  private sponsors: Sponsor = new Sponsor();
  private titulo = 'Formulario de Sponsor';
  constructor(private sponsorService: SponsorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.cargarSponsor();
  }
  cargarSponsor(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.sponsorService.getSponsor(id).subscribe(
            (sponsors) => this.sponsors = sponsors);
        }
      });
  }

  public create(): void {
    this.sponsorService.create(this.sponsors)
      .subscribe(
        sponsor => {
          this.router.navigate(['/sponsor'])
          Swal.fire('Nuevo Sponsor', `Sponsor ${sponsor.nombre} registrado con exito!`, 'success'); }
      );
  }
  update(): void {
    this.sponsorService.update(this.sponsors).subscribe(sponsor => {
        this.router.navigate(['/sponsor'])
        Swal.fire('Sponsor Actualizado', `Sponsor ${sponsor.nombre} actualizado con exito!`, 'success');
      }
    );
  }
}
