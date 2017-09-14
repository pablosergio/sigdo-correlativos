import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Correlativo } from '../correlativo';
import { CorrelativoService } from '../correlativo.service';
import { LoaderService, PageResponse, DataService, DataTable } from '../../common/api';
import { SelectItem, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { UUID } from 'angular2-uuid';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'grid-correlativo',
  templateUrl: './grid-correlativo.component.html',
  styleUrls: ['./grid-correlativo.component.css'],
  providers: [ MessageService ]
})

export class GridCorrelativoComponent extends DataTable<Correlativo> implements OnInit {
  correlativo: Correlativo;
  nuevoCorrelativo: Correlativo;
  numeroCorrelativo: string;
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
  this.numeroCorrelativo = result.id;
  this.loadData(this.currentFilter);
  this.msgs = [];
  this.msgs.push({severity: 'success', summary: 'Success Message', detail: result.msg});
  this.print(this.numeroCorrelativo);
 }

  print(content): void {
    let printContents, popupWin;
    printContents = content;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  reimprimir(numero: Correlativo): void {
    this.print(numero.id);
  }
}


