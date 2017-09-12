import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Correlativo } from '../correlativo';
import { CorrelativoService } from '../correlativo.service';
import { LoaderService, PageResponse, DataService, DataTable } from '../../common/api';
import { SelectItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { UUID } from 'angular2-uuid';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'grid-correlativo',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [ MessageService ]
})

export class GridComponent extends DataTable<Correlativo> implements OnInit {
  correlativo: Correlativo;
  nuevoCorrelativo: Correlativo;
  msgs: Message[] = [];
  constructor(route: ActivatedRoute, router: Router, loaderService: LoaderService,
    dataService: DataService<Correlativo>, correlativoService: CorrelativoService, private messageService: MessageService) {
    super(route, router, dataService, loaderService);
    dataService.endpoint = 'correlativos',
    dataService.communication.update$.subscribe(
      result => {
      });
  }

 ngOnInit() {
 }

 selectCorrelativo(record: Correlativo) {
   this.router.navigate([record.id], { relativeTo: this.route });
 }

 newRecord() {
   this.nuevoCorrelativo = new Correlativo();
   this.nuevoCorrelativo.id = UUID.UUID();
   this.nuevoCorrelativo.isPrinted = false;
   this.nuevoCorrelativo.creation_date = new Date();
   this.service.save(this.nuevoCorrelativo).subscribe(
       result => this.refresh(result),
       error =>  this.errorMessage = <any>error
   );
 }

 refresh(result) {
  this.loadData(this.currentFilter);
  this.msgs = [];
  this.msgs.push({severity: 'success', summary: 'Success Message', detail: result.msg});
 }
}
