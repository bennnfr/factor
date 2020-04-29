import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const doc = new jsPDF();
declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.component.html',
  styles: []
})
export class VerUsuariosComponent implements OnInit {


  constructor( public _usuarioservice: UsuarioService,
               public http: HttpClient ) {
                
                }

  token = localStorage.getItem('token');
  doc = new jsPDF();
  usuarios: any[] = [];
  usuario: string;
  cols: any[];
  selectedFac: any[];
  router: Router;
  fileName = 'ListaDeUsuarios.xlsx';
  a = false;

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
  exportexcel()
  {
     /* table id is passed over here */
     const element = document.getElementById('tablausuarios');
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     console.log(wb);
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);

  }


  exportpdf() {

    doc.autoTable({ html: '#tablausuarios' });

    doc.save('ListaDeUsuarios.pdf');

  }
}
