import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridCorrelativoComponent } from './grid-correlativo/grid-correlativo.component';


const correlativoRoutes: Routes = [
   {
    path: '',
    component: GridCorrelativoComponent,
    /*children: [
      {
        path: '',
        component: GridApplicationComponent
      }
    ]*/
  }
];

@NgModule({
  imports: [
     RouterModule.forChild(correlativoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CorrelativoRoutingModule { }
