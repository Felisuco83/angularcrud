import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  @ViewChild("cajanumero") cajanumero : ElementRef;
  @ViewChild("cajanombre") cajanombre : ElementRef;
  @ViewChild("cajalocalidad") cajalocalidad : ElementRef;
  public departamento: Departamento;
  constructor(private _service: DepartamentoService, private _activeRoute: ActivatedRoute,
    private _router: Router) { }

  buscarDepartamento(iddept: string){
    this._service.buscarDepartamento(iddept).subscribe(resp =>{
      this.departamento = resp;
    }, error =>{
      console.log(error);
    })
  }

  modificarDepartamento() {
    var num = parseInt(this.cajanumero.nativeElement.value);
    var nom = this.cajanombre.nativeElement.value;
    var loc = this.cajalocalidad.nativeElement.value;
    var dpt = new Departamento(num,nom,loc);
    this._service.updateDep(dpt).subscribe(response =>{
      this._router.navigate(["/"]);
    },error =>{
      console.log(error);
    })
  }

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params)=>{
      this.buscarDepartamento(params.iddepartamento);
    })
  }

}
