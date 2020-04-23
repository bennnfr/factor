import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// import * as swal from 'sweetalert';
import { UsuarioService } from '../../services/service.index';
import { Usuario, Usuario2 } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styles: []
})
export class CrearUsuarioComponent implements OnInit {
  
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }


  ngOnInit() {

      this.forma = new FormGroup({
        nombre: new FormControl( null , Validators.required ),
        correo: new FormControl( null , [Validators.required, Validators.email] ),
        password: new FormControl( null , Validators.required ),
        password2: new FormControl( null , Validators.required ),
        puesto: new FormControl( null ),
        genero: new FormControl( null ),
        estatus: new FormControl( null )

      }, { validators: this.sonIguales( 'password', 'password2' )  } );

  }


  registrarUsuario() {

// Obtener el elemento por el id
    const genero: any = document.getElementById('genero');
    const estatus: any = document.getElementById('estatus');

// Obtener el valor de la opción seleccionada
    const valorGenero = genero.options[genero.selectedIndex].value;
    const valorEstatus = estatus.options[estatus.selectedIndex].value;

// Obtener el texto que muestra la opción seleccionada
//    let valorSeleccionado2 = this.genero.options[this.genero.selectedIndex].text;

    if ( this.forma.invalid ) {
      console.log('llego aca');
      return;
    }

    const usuario = new Usuario2(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.puesto,
      valorGenero,
      valorEstatus
    );

    this._usuarioService.crearUsuario( usuario )
              .subscribe( resp => {this.router.navigate(['/crearusuario']),
              Swal.fire(
                'Creacion de Usuario',
                'Exitosa',
                'success'
             ); }, (err) => {
                                    console.log(err.error.error.email[0]);
                                    if (err.error.error.email[0] === 'has already been taken') {

                                      Swal.fire(
                                        'Error al crear usuario',
                                        'El correo electronico ya existe',
                                        'error'
                                     );

                                    }


                                  } );

    this.forma.reset();

  //  console.log(usuario);
  }



}
