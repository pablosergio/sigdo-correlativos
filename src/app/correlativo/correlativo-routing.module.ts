import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';


const correlativoRoutes: Routes = [
   {
    path: '',
    component: GridComponent,
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
