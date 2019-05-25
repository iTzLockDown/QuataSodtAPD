import {Perfileusuario} from "../perfilesusuarios/perfileusuario";

export class Usuario {
  id: number;
  nombre: string;
  apellidop: string;
  apellidom: string;
  sexo: string;
  dni: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
  estActivo: string;
  fechaNac: string;
  fechaReg: string;
  perfilUsuario: Perfileusuario;
}


