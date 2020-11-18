import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';

@Injectable()
export class DepartamentoService {
    private url:string;
    constructor(private _httpclient: HttpClient){
        this.url = Global.urldept;
    }

    getDep():Observable<any>{
        var request = "/api/departamentos"
        return this._httpclient.get(this.url+request);
    }

    insertDep(dpto: Departamento): Observable<any>{
        var request = "/api/departamentos";
        //necesitamos convertir el objeto a json
        var json = JSON.stringify(dpto);
        //para enviar la informacion a servicio se hace mediante cabeceras
        var header = new HttpHeaders().set("Content-Type", "application/json");
        return this._httpclient.post(this.url+request, json, {headers: header});
    }

    deleteDep(idDpto: string): Observable<any> {
        var request = "/api/departamentos/" + idDpto;
        return this._httpclient.delete(this.url + request);
    }

    updateDep(departamento: Departamento) :Observable<any> {
        let json = JSON.stringify(departamento);
        var header = new HttpHeaders().set("Content-Type", "application/json");
        var request = "/api/departamentos";
        return this._httpclient.put(this.url+request, json, {
            headers: header
        })
    }

    buscarDepartamento (iddepartamento: string): Observable<any> {
        var request = "api/departamentos/"+ iddepartamento;
        return this._httpclient.get(this.url+ request);
    }
}