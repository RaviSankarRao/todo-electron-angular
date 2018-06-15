import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpResponse } from '@angular/common/http';
import { Note } from "./app.component";

const notesApiUrl = 'http://localhost:3000/api/notes';

@Injectable()
export class NotesService {

  constructor(
    private http: HttpClient
  ) { }

    public getNotes(): Observable<Note[]> {
        const observable = this.http.get<Note[]>(
                notesApiUrl
        );

        // observable.pipe(
        //     catchError(this.handleError('getBooks', []))
        // );

        return observable;
    }

    public updateNotes(notes: Note[]): Observable<Note[]> {

        const observable = this.http.post<Note[]>(
            notesApiUrl,
            notes
        );

        // observable.pipe(
        //     catchError(this.handleError('addBook', []))
        // );

        return observable;
    }

    // private handleError<T>(operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {
    //         console.error(error);
    //         return of(result as T);
    //     };
    // }
}