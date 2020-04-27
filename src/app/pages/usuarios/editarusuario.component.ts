import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario, Usuario2, Usuario3 } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styles: []
})
export class EditarUsuarioComponent implements OnInit {

  forma: FormGroup;
  resp: any;

  constructor( public _usuarioService: UsuarioService,
               public http: HttpClient,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.forma = new FormGroup({
      nombre: new FormControl( null),
      correo: new FormControl( null),
      password: new FormControl( null),
      puesto: new FormControl( null ),
      genero: new FormControl( null ),
      estatus: new FormControl( null )

    });

    this._usuarioService.getUsuario( id ).subscribe( resp => this.resp = resp );

    console.log ( 'aqui esta el id?... ' + id );

  }

  guardarCambios() {
    // Obtener el elemento por el id
    const id = this.route.snapshot.paramMap.get('id');
    const genero: any = document.getElementById('genero');
    const estatus: any = document.getElementById('estatus');
    const nombre: any = document.getElementById('nomb');
    const email: any = document.getElementById('mail');
    const puesto: any = document.getElementById('pues');

// Obtener el valor de la opción seleccionada
    const valorGenero = genero.options[genero.selectedIndex].value;
    const valorEstatus = estatus.options[estatus.selectedIndex].value;
    const valorNombre = nombre.value;
    const valorEmail = email.value;
    const valorPuesto = puesto.value;

// Obtener el texto que muestra la opción seleccionada
//    let valorSeleccionado2 = this.genero.options[this.genero.selectedIndex].text;

    if ( this.forma.invalid ) {
      console.log('llego aca');
      return;
    }

    const usuario = new Usuario3(
      id,
      valorNombre,
      valorEmail,
      valorPuesto,
      valorGenero,
      valorEstatus
    );

   // console.log(usuario);

    // tslint:disable-next-line: no-unused-expression
   // this._usuarioService.actualizaUsuario(usuario).subscribe( resp => { resp;
   //                                                                     console.log(resp);
  //  } );

    swal2.fire({
      title: 'Desea Modificar al usuario',
      text: usuario.nombre + '?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._usuarioService.actualizaUsuario(usuario).subscribe( () => {

          swal2.fire({
            title: 'El usuario',
            text: 'fue Modificado con exito',
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


}
