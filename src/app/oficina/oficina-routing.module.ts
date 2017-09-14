import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OficinaComponent } from './oficina.component';
import { GridOficinaComponent } from './grid-oficina/grid-oficina.component';


const oficinaRoutes: Routes = [
   {
    path: '',
    component: OficinaComponent,
    children: [
    {
        path: '',
        component: GridOficinaComponent,
      }
    ]
   }
];

@NgModule({
  imports: [
     RouterModule.forChild(oficinaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OficinaRoutingModule { }
