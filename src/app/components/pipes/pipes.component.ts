import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {

  cadenadetexto: string;
  fecha: Date;
  numero: number;
  numero2: number;
  objeto = null;

  constructor() {
    this.cadenadetexto = "Una cadena de texto";
    this.fecha = new Date();
    this.numero = 123.456;
    this.numero2 = 0.259;
    this.objeto = {
      nombre: 'Carlos',
      apellidos: 'Herrera'
    }
  }

  ngOnInit() { }

}
