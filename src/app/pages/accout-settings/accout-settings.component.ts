import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SettingsService, UsuarioService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario, Usuario2, Usuario3 } from '../../models/usuario.model';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  forma: FormGroup;
  idUsuario: string;
  resp: any;

  constructor( public _ajustes: SettingsService,
               public _usuarioService: UsuarioService ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl( null),
      correo: new FormControl( null),
      password: new FormControl( null),
      puesto: new FormControl( null ),
      genero: new FormControl( null ),
      estatus: new FormControl( null )

    });

    this.idUsuario = localStorage.getItem('id');
    this.colocarCheck();
    this._usuarioService.getUsuario( this.idUsuario ).subscribe( resp => this.resp = resp );
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any ) {

    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');

  }

  colocarCheck() {

    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }

  guardarCambios() {
    // Obtener el elemento por el id
    this.idUsuario = localStorage.getItem('id');
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
      this.idUsuario,
      valorNombre,
      valorEmail,
      valorPuesto,
      valorGenero,
      valorEstatus
    );

   // console.log(usuario);

    this._usuarioService.actualizaUsuario(usuario).subscribe( resp => { resp;
    console.log(resp);
    } );


  }

}
