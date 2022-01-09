import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Accept': 'application/json' });
  options

  datasource = null;
  columnas: string[] = ["correo", "categoria"];
  @ViewChild('paginator') paginator: MatPaginator;

  single: any;
  view: any[] = [700, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'categoria';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'cantidad';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get("http://localhost:8080/api/v1/formulario/get", this.options).subscribe(respuesta => {
      console.log(respuesta);
      this.single = respuesta;
      Object.assign(this, { respuesta });
    });

    this._http.get("http://localhost:8080/api/v1/formulario/list").subscribe(respuesta => {
      console.log(respuesta);
      let resp : any = respuesta;
      this.datasource = new MatTableDataSource<any>(resp);
      this.datasource.paginator=this.paginator;
    });
  }

  onSelect(data): void {
    console.log('Click', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activar', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Desactivar', JSON.parse(JSON.stringify(data)));
  }

}
