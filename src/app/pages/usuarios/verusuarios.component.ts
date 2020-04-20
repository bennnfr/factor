import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario, Usuario2 } from '../../models/usuario.model';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  ngOnInit() {

  this._usuarioservice.getUsuarios().subscribe( resp => {this.usuarios = resp;} );

  }

}
