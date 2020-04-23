import { Injectable } from '@angular/core';
import { Usuario, Usuario2, Usuario3 } from '../../models/usuario.model';
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
  idUsuario: string;

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

    const url = `${URL_SERVICIOS}/users?auth[email]=${usuario.email}&auth[password]=${usuario.password}&auth[name]=${usuario.nombre}&auth[job]=${usuario.puesto}&auth[gender]=${usuario.genero}&auth[status]=${usuario.estatus}&token=${this.token}&secret_key=${SECRET_KEY}`;


    return this.http.post( url, null ).pipe(
              map( (resp: any) => {
                return resp;
              }));
  }

  getUsuarios() {

    const url = `${URL_SERVICIOS}/users?secret_key=${SECRET_KEY}&token=${this.token}`;

    return this.http.get( url ).pipe(
    map( (resp: any) => {return this.crearArregloUsuarios(resp);
    }));

    }
  crearArregloUsuarios( usuariosObj: any) {

    const usuarios: any[] = [];
    const resul: any[] = [];

    if ( usuariosObj === null ) { return []; }
    Object.keys ( usuariosObj ).forEach( key => {
      const usuario: any = usuariosObj[key];
      usuarios.push( usuario );
    });
    // tslint:disable-next-line: forin
    for (const prop in usuarios[0]) {
  //  console.log( usuarios[0][prop].attributes );
    resul.push( usuarios[0][prop].attributes );
    }

    console.log(resul);

    return resul;

}

getUsuario( id: string ) {

  const url = `${URL_SERVICIOS}/users/${id}?secret_key=${SECRET_KEY}&token=${this.token}`;

  return this.http.get( url ).pipe(
    map ( (resp: any) => { return this.crearArregloUsuario(resp);
    } ));

}

crearArregloUsuario( usuariosObj: any) {

  const usuarios: any[] = [];
  const resul: any[] = [];
 // console.log(usuariosObj);
  if ( usuariosObj === null ) { return []; }
  Object.keys ( usuariosObj ).forEach( key => {
    const usuario: any = usuariosObj[key];
    usuarios.push( usuario );
  });
  // tslint:disable-next-line: forin
//  console.log( usuarios[0][prop].attributes );
  resul.push( usuariosObj.data.attributes );

 // console.log(resul);

  return resul;

}

actualizaUsuario(usuario: Usuario3) {

const url = `${URL_SERVICIOS}/users/${usuario.id}?token=${this.token}&secret_key=${SECRET_KEY}&auth[job]=${usuario.puesto}&auth[status]=${usuario.estatus}&auth[password]=123456789&auth[gender]=${usuario.genero}&auth[email]=${usuario.email}&auth[name]=${usuario.nombre}`;

return this.http.patch( url, null ).pipe(
  map( (resp: any) => { return resp;
  } ));
}

}
