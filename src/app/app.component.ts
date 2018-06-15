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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public notes: Note[] = [];
  public selectedNote: Note = {};
  public isAddNote: boolean = false;
  public isEditNote: boolean = false;
  public editNote: Note;
  public noteName: string;
  public hoverId: number;

  constructor(
    private noteService: NotesService) {
  }

  public ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      console.log(notes);
      if (notes) {
        this.notes = notes;
      }
      else {
        this.notes = [];
      }
    });
  }

  public onAddNote(): void {
    this.isAddNote = true;
  }

  public saveAddNote(): void {
    const count = this.notes.length;

    let note: Note = {
      id: count + 1,
      name: this.noteName,
      content: '',
      date: new Date()
    }

    this.notes.unshift(note);
    this.noteService.updateNotes(this.notes).subscribe(notes => {
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
    this.notes.forEach(note => {
      if (note.id === this.editNote.id) {
        note.name = this.editNote.name;
        note.date = new Date();
      }
    });

    this.noteService.updateNotes(this.notes).subscribe(notes => {
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
      this.notes.forEach(note => {
        if (note.id === this.selectedNote.id) {
          note.content = this.selectedNote.content;
          note.date = new Date();
        }
      });
      
      this.noteService.updateNotes(this.notes).subscribe(notes => {
      });
    });
  }
}
