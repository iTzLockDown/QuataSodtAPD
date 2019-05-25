import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from './Dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {Dashboard2Component} from './Dashboard/dashboard2.component';
import {UsuarioService} from './usuarios/usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './usuarios/form.component';

import { UdelegadosComponent } from './udelegados/udelegados.component';
import { UdeportistaComponent } from './udeportista/udeportista.component';
import { DeporteComponent } from './deporte/deporte.component';
import { DepformComponent } from './deporte/depform.component';

import {FormsModule} from '@angular/forms';
import {DeporteService} from './deporte/deporte.service';
import {UdeportistaService} from './udeportista/udeportista.service';
import {UdepformComponent} from './udeportista/udepform.component';
import {UdelegadoService} from './udelegados/udelegado.service';
import {UdelformComponent} from './udelegados/udelform.component';
import { SponformComponent } from './sponsor/sponform.component';
import {SponsorService} from './sponsor/sponsor.service';
import {SponsorComponent} from './sponsor/sponsor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { PerfilesusuariosComponent } from './perfilesusuarios/perfilesusuarios.component';

const routes: Routes = [
    {path: '', redirectTo: '/deportes', pathMatch: 'full'},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'usuarios/form', component: FormComponent},
    {path: 'usuarios/form/:id', component: FormComponent},
    {path: 'deportes', component: DeporteComponent},
    {path: 'deportes/dform', component: DepformComponent},
    {path: 'deportes/dform/:id', component: DepformComponent},
    {path: 'deportistas', component: UdeportistaComponent},
    {path: 'deportistas/dform', component: UdepformComponent},
    {path: 'deportistas/dform/:id', component: UdepformComponent},
    {path: 'delegados', component: UdelegadosComponent},
    {path: 'delegados/dform', component: UdelformComponent},
    {path: 'delegados/dform/:id', component: UdelformComponent},
    {path: 'sponsor', component: SponsorComponent},
    {path: 'sponsor/dform', component: SponformComponent},
    {path: 'sponsor/dform/:id', component: SponformComponent}


  ];

@NgModule({
  declarations: [
    DashboardComponent,
    Dashboard2Component,
    UsuariosComponent,
    AppComponent,
    FormComponent,
    UdelegadosComponent,
    UdeportistaComponent,
    DeporteComponent,
    DepformComponent,
    UdepformComponent,
    UdelformComponent,
    SponformComponent,
    SponsorComponent,
    PerfilesusuariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  providers: [
    UsuarioService,
    DeporteService,
    UdeportistaService,
    UdelegadoService,
    SponsorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
