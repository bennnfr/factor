import { Injectable } from '@angular/core';
import { Usuario, Usuario2 } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  usuario2: Usuario2;
  usuariop: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
   // return ( this.token.length > 5 ) ? true : false;
   let stringExpiraToken = localStorage.getItem('expiratoken');
   stringExpiraToken = stringExpiraToken.substring(0, 10);


   const fechaExpiraToken = Date.parse(stringExpiraToken);
   const fechaHoy = new Date();
   const fechaHoyA = fechaHoy.getFullYear().toString();
   let fechaHoyM = (fechaHoy.getMonth() + 1).toString();
   let fechaHoyD = fechaHoy.getDate().toString();

   if ( fechaHoyM.length === 1 ) {
    fechaHoyM = ( '0' + fechaHoyM );
   }

   if ( fechaHoyD.length === 1 ) {
    fechaHoyD = ( '0' + fechaHoyD );
   }

   const fechaHoyC = Date.parse(fechaHoyA + '-' + fechaHoyM + '-' + fechaHoyD);

   // console.log(fechaExpiraToken);
   // console.log(fechaHoyC);

   if ( this.token.length > 5 ) {

    if ( fechaExpiraToken > fechaHoyC ) {
      return true;
    }
  } else {
      return false;
  }
}

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStoragelogin( id: string, token: string, usuario: Usuario, email: string, expiratoken: string ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('emailuser', email );
    localStorage.setItem('expiratoken', expiratoken);

    this.usuario = usuario;
    this.token = token;
  }

  logout() {

    Swal.fire({
      title: 'Cerrar Sesion?',
      text: `Se cerrara la sesion actual`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }). then ( resp => {
      if ( resp.value) {

        this.usuario = null;
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('id');
        localStorage.removeItem('emailuser');
        localStorage.removeItem('expiratoken');
        this.router.navigate(['/login']);
        Swal.fire(
    'Terminó la sesion',
    'Correctamente',
    'info'
  );
      }
    });


  }

  login( usuario: any, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    let url = `${URL_SERVICIOS}/authenticate?auth[email]=${usuario.email}&auth[password]=${usuario.password}&secret_key=${SECRET_KEY}`;


    return this.http.get( url )
                .map( (resp: any) => {

                  console.log(resp.data.attributes.id);
                  console.log(resp.data.token);
                  console.log(resp.data.attributes.email);

                  this.guardarStoragelogin( resp.data.attributes.id,
                                            resp.data.token,
                                            resp.data.attributes.name,
                                            resp.data.attributes.email,
                                            resp.data.expires_at );

                  return true;
                });


  }


  crearUsuario( usuario: Usuario2 ) {

    const url = `${URL_SERVICIOS}/users?auth[email]=${usuario.email}&auth[password]=${usuario.password}&auth[name]=${usuario.nombre}&token=${this.token}&secret_key=${SECRET_KEY}&genero=${usuario.genero}&estatus=${usuario.estatus}`


    return this.http.post( url, null )
              .map( (resp: any) => {

                console.log('AAAA ' + resp.error.error.email);

                Swal.fire(
                  'El Usuario: ' + usuario.nombre,
                  'Fue creado exitosamente',
                  'success'
                );
                return resp;
              }, (err) => {
                Swal.fire(
                  'El Usuario:',
                  'Fue creado exitosamente',
                  'success'
                );
                return console.log(err.error.error.email);
                });
  }

  getUsuarios() {

    const url = `${URL_SERVICIOS}/users?secret_key=${SECRET_KEY}&token=${this.token}`;

    return this.http.get( url ).pipe(
    map( (resp: any) => {return this.crearArreglo(resp);
    }));

    }
  crearArreglo( usuariosObj: any) {

    const usuarios: any[] = [];
    const resul: any[] = [];

    if ( usuariosObj === null ) { return []; }
    Object.keys ( usuariosObj ).forEach( key => {
      const usuario: any = usuariosObj[key];
      usuarios.push( usuario );
    });
    // tslint:disable-next-line: forin
    for (const prop in usuarios[0]) {
    console.log( usuarios[0][prop].attributes );
    resul.push( usuarios[0][prop].attributes )
    }

    console.log(resul);

    return resul;

}
}
