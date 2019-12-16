import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Run } from '../models/run';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  // F i e l d

  private baseUrl = 'http://localhost:8099/';
  private url = this.baseUrl + 'api/runs';

  // C o n s t r u c t o r

  constructor(private http: HttpClient) { }

  // M e t h o d s

  index() {
    const httpOptions = {
      headers: new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Run[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  create(newRun: Run) {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Run>(this.url, newRun, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  update(run: Run) {

    const httpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/json'
        }
    };
    return this.http.put<Run>(`${this.url}/${run.id}`, run, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('RunService.update(): Error updating run');
      })
    );
  }

  delete(id: number) {
    const httpOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
  };
    return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TodoService.delete(): Error deleting todo');
      })
    );
  }
}


