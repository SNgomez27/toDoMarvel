import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewUser} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = 'http://localhost:8080/api/users';




  constructor(
    private http: HttpClient,
  ) { }

  check(): Observable<any> {
    return this.http.get(`${this.url}/status`)
  }
  createUser(usuario: NewUser): Observable<any> {
    return this.http.post(`${this.url}/create`,
      usuario, {headers: {'Content-Type': 'application/json'}
    })
  }

}
