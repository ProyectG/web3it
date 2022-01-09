import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formulario } from '../dto/Formulario';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Accept': 'application/json' });
  options: any;

  formulario: FormGroup;
  tipoMusical: string[] = ['Rock', 'Clasica', 'Jazz', 'Blues', 'Metal', 'Punk', 'Disco', 'Funk', 'Techno', 'Pop', 'Otro'];

  codigo: string | undefined;
  mensaje: string | undefined;

  constructor(private _http: HttpClient,
    private router: Router) {
    this.formulario = new FormGroup(
      {
        email: new FormControl('', Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required])),
        check: new FormControl('', Validators.required)
      }
    );
  }

  ngOnInit() {
  }

  enviarMensaje() {
    if (this.formulario.valid) {
      var peticion: Formulario = new Formulario();
      peticion.correo = this.formulario.get('email').value;
      peticion.seleccion = this.formulario.get('check').value
      console.log(peticion);
      this._http.put("http://localhost:8080/api/v1/formulario/add", peticion, this.options).subscribe(respuesta => {
        this.codigo = respuesta['codigo'];
        this.mensaje = respuesta['descripcion'];
        setTimeout(() => {
          if (this.codigo == '00') {
            this.router.navigate(['/resultados']);
          }
          this.codigo = undefined;
        }, 5000);
      });
    }else{
      this.codigo='-1';
      setTimeout(() => {
        this.codigo = undefined;
      }, 5000);
    }
  }

}
