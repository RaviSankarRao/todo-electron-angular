import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { NotesService } from "./app.service";

export class Note {
  id?: number;
  name?: string;
  content?: string;
  date?: Date;
}

let alphaSortOrder: boolean = false;
let dateSort: boolean = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public notes: Note[] = [];
  public displayNotes: Note[] = [];
  public selectedNote: Note = {};
  public isAddNote: boolean = false;
  public isEditNote: boolean = false;
  public editNote: Note;
  public noteName: string;
  public hoverId: number;
  public searchText: string;
  public showSearch: boolean = false;

  constructor(
    private noteService: NotesService) {
  }

  public ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      if (notes) {
        this.displayNotes = notes;
      }
      else {
        this.displayNotes = [];
      }
    });
  }

  public onAddNote(): void {
    this.isAddNote = true;
  }

  public saveAddNote(): void {
    const count = this.displayNotes.length;

    let note: Note = {
      id: count + 1,
      name: this.noteName,
      content: '',
      date: new Date()
    }

    this.displayNotes.unshift(note);
    this.noteService.updateNotes(this.displayNotes).subscribe(notes => {
      this.isAddNote = false;
      this.noteName = null;
    });
  }

  public cancelAddNote(): void {
    this.isAddNote = false;
    this.noteName = null;
  }

  public onNoteEdit(note: Note): void {
    this.isEditNote = true;
    this.editNote = note;
  }

  public saveEditNote(): void {
    this.displayNotes.forEach(note => {
      if (note.id === this.editNote.id) {
        note.name = this.editNote.name;
        note.date = new Date();
      }
    });

    this.noteService.updateNotes(this.displayNotes).subscribe(notes => {
      this.isEditNote = false;
      this.editNote = null;
    });
  }

  public cancelEditNote(): void {
    this.isEditNote = false;
    this.editNote = null;
  }

  public onNoteSelect(note: Note): void {
    this.selectedNote = note;
  }

  public onTextUpdate(): void {
    //get all updated notes (if edited from browser)
    this.noteService.getNotes().subscribe(notes => {
      this.displayNotes.forEach(note => {
        if (note.id === this.selectedNote.id) {
          note.content = this.selectedNote.content;
          note.date = new Date();
        }
      });

      this.noteService.updateNotes(this.displayNotes).subscribe(notes => {
      });
    });
  }

  public onNoteDelete(note: Note): void {
    this.displayNotes = this.displayNotes.filter(function(n){
      return n.id !== note.id;
    });

    this.noteService.updateNotes(this.displayNotes).subscribe(notes => {
      });
  }

  public sortAplhabetically(): void {
    alphaSortOrder = !alphaSortOrder;
    this.displayNotes.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return alphaSortOrder ? 1: -1;
      }
      if (nameA > nameB) {
        return alphaSortOrder ? -1: 1;
      }
      // names must be equal
      return 0;
    });
  }

  public sortByDate(): void {
    dateSort = !dateSort;
    this.displayNotes.sort(function (a, b) {
      if (a.date < b.date) {
        return dateSort ? 1: -1;
      }
      if (a.date > b.date) {
        return dateSort ? -1: 1;
      }
      // dates must be equal
      return 0;
    });
  }

  public onSearchNote(): void {
    let searchString = this.searchText;

    if (this.notes.length === 0) {
      this.notes = this.displayNotes.slice();
    }

    if (this.searchText) {

      this.displayNotes = this.notes.filter(function (n) {
        return n.content.includes(searchString) || n.name.includes(searchString);
      });
    } else {
      
    }
  }
}
