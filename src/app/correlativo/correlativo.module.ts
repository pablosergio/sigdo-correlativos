import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrelativoRoutingModule } from './correlativo-routing.module';
import { CorrelativoService } from './correlativo.service';
import { GridComponent } from './grid/grid.component';
import { PanelModule, DataTableModule, DropdownModule, SplitButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    CorrelativoRoutingModule,
    PanelModule,
    DataTableModule,
    DropdownModule,
    SplitButtonModule
  ],
  declarations: [
    GridComponent
  ],
  providers: [
    CorrelativoService
  ]
})
export class CorrelativoModule { }
