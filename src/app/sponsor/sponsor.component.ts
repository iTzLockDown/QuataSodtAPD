import { Component, OnInit } from '@angular/core';
import {Sponsor} from './sponsor';
import {SponsorService} from './sponsor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html'
})
export class SponsorComponent implements OnInit {
  sponsors: Sponsor[];

  constructor(private sponsorService: SponsorService) {
  }

  ngOnInit() {
    this.sponsorService.getSponsors().subscribe(
      sponsor => this.sponsors = sponsor
    );
  }

  delete(sponsor: Sponsor): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro de eliminar ${sponsor.nombre} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar Cliente!'
    }).then((result) => {
      if (result.value) {
        this.sponsorService.delete(sponsor.id).subscribe(
          response => {
            this.sponsors = this.sponsors.filter(spon => spon !== sponsor)
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
