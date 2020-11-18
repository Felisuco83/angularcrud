import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  public departamentos: Array<Departamento>;

  eliminarDepartamento(id: string) {
    this._service.deleteDep(id).subscribe(response => {
      this.cargarDepartamentos();
    }, error => {
      console.log(error);
    })
  }
  cargarDepartamentos(){
    this._service.getDep().subscribe(resp =>{
      this.departamentos = resp;
    }, error =>{
      console.log(error);
    })
  }

  constructor(private _service: DepartamentoService, private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params)=> {
      if(params.iddepartamento != null) {
        this.eliminarDepartamento(params.iddepartamento);
      } else {
        this.cargarDepartamentos();
      }
    })
  }
}
