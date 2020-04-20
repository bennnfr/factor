import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  // usuario: Usuario;

   usuario = localStorage.getItem('usuario');
   email = localStorage.getItem('emailuser');

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
  let  usuario = this.usuario;
  let  email = this.email;
  }

}
