import { Component } from '@angular/core';

export class Note {
  id?: number;
  name?: string;
  content?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public notes: Note[] = [
    { id: 1, name: 'Onboard', content: 'content related to onboard' },
    { id: 2, name: 'Talent', content: 'content related to Talent' },
    { id: 3, name: 'Service', content: 'content related to Onboard Service' },
    { id: 4, name: 'XRM', content: 'content related to XRM' },
    { id: 5, name: 'Int Test', content: 'content related to Int Test' },
    { id: 6, name: 'Personal', content: 'content related to Personal' },
    { id: 7, name: 'Reminders', content: 'content related to Reminders' },
    
  ];

  public selectedNote: Note = {
  };

  public isAddNote: boolean = false;
  public isEditNote: boolean = false;
  public editNote: Note;
  public noteName: string;
  public hoverId: number;

  public onAddNote(): void {
    this.isAddNote = true;
  }

  public saveAddNote(): void {
    const count = this.notes.length;

    let note: Note = {
      id: count + 1,
      name: this.noteName,
      content: ''
    }
    this.notes.unshift(note);

    this.isAddNote = false;
    this.noteName = null;
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
      }
    });

    this.isEditNote = false;
    this.editNote = null;
  }

  public cancelEditNote(): void {
    this.isEditNote = false;
    this.editNote = null;
  }

  public onNoteSelect(note: Note): void {
    this.selectedNote = note;
  }
public onTextUpdate(): void {
    this.notes.forEach(note => {
      if (note.id === this.selectedNote.id) {
        note.content = this.selectedNote.content;
      }
    });
  }
}
