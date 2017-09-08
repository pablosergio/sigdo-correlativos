import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPanelComponent } from './main-panel.component';
import { AuthGuardService } from '../common/api';


const mainPanelRoutes: Routes = [
   {
    path: '',
    canActivate: [AuthGuardService],
    component: MainPanelComponent,
    children: [
      {
        path: 'correlativos',
        loadChildren: 'app/correlativo/correlativo.module#CorrelativoModule'
      }
    ]
  }
];

@NgModule({
  imports: [
     RouterModule.forChild(mainPanelRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainPanelRoutingModule { }
