import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Correlativo } from '../correlativo';
import { CorrelativoService } from '../correlativo.service';
import { LoaderService, PageResponse, DataService, DataTable } from '../../common/api';
import { SelectItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'grid-correlativo',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent extends DataTable<Correlativo> implements OnInit {
  correlativo: Correlativo;
  constructor(route: ActivatedRoute, router: Router, loaderService: LoaderService,
    dataService: DataService<Correlativo>, correlativoService: CorrelativoService) {
    super(route, router, dataService, loaderService);
    dataService.endpoint = 'correlativos',
    dataService.communication.update$.subscribe(
      result => {
        this.reload();
      });
  }

 ngOnInit() {
 }

 selectCorrelativo(record: Correlativo) {
   this.router.navigate([record.id], { relativeTo: this.route });
 }

 newRecord() {
   this.router.navigate(['new'], { relativeTo: this.route });
 }
}
