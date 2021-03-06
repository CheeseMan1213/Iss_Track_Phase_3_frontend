/*
  This is an Angular Service file. This file is what makes my HTTP requests to the backend
  happen.
*/
import { Injectable } from '@angular/core';
import { ITestModel } from './test-model/test-model.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestModelService {

  //private testModelURL = 'https://app.james2ch9developer.com:8443/testApi/TestModels';
  private testModelURL = 'https//broke_on_purpose';

  constructor(private http: HttpClient) {
    //
  }

  getAllTestModels(): Observable<ITestModel[]> {
    return this.http.get<ITestModel[]>(this.testModelURL).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
