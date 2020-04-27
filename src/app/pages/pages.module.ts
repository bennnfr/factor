
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { CommonModule } from '@angular/common';
// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CrearUsuarioComponent } from './usuarios/crearusuario.component';
import { VerUsuariosComponent } from './usuarios/verusuarios.component';
import { EditarUsuarioComponent } from './usuarios/editarusuario.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';






@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        CrearUsuarioComponent,
        VerUsuariosComponent,
        EditarUsuarioComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        PipesModule,
        CommonModule,
        TableModule
    ]
})
export class PagesModule { }
