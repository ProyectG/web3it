import { MatPaginatorIntl } from '@angular/material/paginator';

export function pagCustom() {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Registros por pagina:';
    return customPaginatorIntl;
  }