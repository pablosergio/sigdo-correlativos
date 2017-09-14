import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OficinaRoutingModule } from './oficina-routing.module';
import { OficinaService } from './oficina.service';
import { PanelModule, DataTableModule, DropdownModule, ButtonModule, GrowlModule } from 'primeng/primeng';
import { OficinaComponent } from './oficina.component';
import { GridOficinaComponent } from './grid-oficina/grid-oficina.component';

@NgModule({
  imports: [
    CommonModule,
    OficinaRoutingModule,
    PanelModule,
    DataTableModule,
    DropdownModule,
    ButtonModule,
    GrowlModule
  ],
  declarations: [
    OficinaComponent,
    GridOficinaComponent
  ],
  providers: [
    OficinaService
  ]
})

export class OficinaModule { }
