import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, PageResponse, DataService, DataTable } from '../../common/api';
import { SelectItem, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { UUID } from 'angular2-uuid';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Oficina } from '../oficina';
import { OficinaService } from '../oficina.service';


@Component({
  selector: 'grid-oficina',
  templateUrl: './grid-oficina.component.html',
  styleUrls: ['./grid-oficina.component.css'],
  providers: [MessageService]
})
export class GridOficinaComponent extends DataTable<Oficina> implements OnInit {
  oficina: Oficina;
  nuevaOficina: Oficina;
  msgs: Message[] = [];
  constructor(route: ActivatedRoute, router: Router, loaderService: LoaderService,
    dataService: DataService<Oficina>, oficinaService: OficinaService, private messageService: MessageService) {
    super(route, router, dataService, loaderService);
    dataService.endpoint = 'oficinas';
    dataService.communication.update$.subscribe(
      result => {
    });
  }

  ngOnInit() {
  }

  selectOficina(record: Oficina) {
   this.router.navigate([record.id], { relativeTo: this.route });
  }

  newRecord() {
   this.nuevaOficina = new Oficina();
   this.nuevaOficina.id = UUID.UUID();
   this.nuevaOficina.nombre = 'Oficina Punata';
   this.nuevaOficina.ubicacion = 'Valle Alto';
    this.nuevaOficina.prefijo = 'PU';
   this.nuevaOficina.creation_date = new Date();
   this.service.save(this.nuevaOficina).subscribe(
       result => this.refresh(result),
       error =>  this.errorMessage = <any>error
   );
  }

  refresh(result) {
    this.nuevaOficina = result.id;
    this.loadData(this.currentFilter);
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success Message', detail: result.msg});
   }
}
