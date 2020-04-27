import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.component.html',
  styles: []
})
export class VerUsuariosComponent implements OnInit {

  constructor( public _usuarioservice: UsuarioService,
               public http: HttpClient ) { }

  token = localStorage.getItem('token');

  usuarios: any[] = [];
  usuario: string;
  cols: any[];
  selectedFac: any[];
  router: Router;

  ngOnInit() {

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'correo', header: 'Correo' },
      { field: 'puesto', header: 'Puesto' },
      { field: 'genero', header: 'Genero' },
      { field: 'estatus', header: 'Estatus' }
  ];

    this._usuarioservice.getUsuarios().subscribe( resp => {this.usuarios = resp; } );

  }

  borraUsuario( user: any ) {

    swal2.fire({
      title: 'Desea Eliminar al usuario',
      text: user.name + '?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._usuarioservice.borrarUsuario( user ).subscribe( () => {

          swal2.fire({
            title: 'El usuario' + user.name,
            text: 'fue eliminado con exito',
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: false,
            allowOutsideClick: false
          }). then ( res => {

            if ( res.value ) {
              window.location.reload();
            }

          } );

        } );

      }
    });

  }

  editarUsuario( user: any ) {

    this.router.navigate(['/dashboard']);

    console.log( user );

  }


}
