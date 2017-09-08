import { Injectable } from '@angular/core';
import { DataService } from '../common/api';
import { Correlativo } from './correlativo';

@Injectable()
export class CorrelativoService  extends DataService<Correlativo> {
    guardar(record: Correlativo) {
      if (record.id !== null) {
        return this.update(record);
      } else {
          return this.save(record);
      }
  }
}
