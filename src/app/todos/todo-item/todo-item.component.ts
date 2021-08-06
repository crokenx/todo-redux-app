import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;
  check: FormControl;
  txtInput: FormControl;
  editing = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.check = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );
    this.check.valueChanges.subscribe(() => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }
  editar(){
    this.editing = true;
    this.txtInput.setValue(this.todo.texto);
    // Implementación necesaria para que haga la propiedad select del texto actual correctamente
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }
  terminarEdicion(){
    this.editing = false;
    if(this.txtInput.invalid)return;
    if(this.txtInput.value === this.todo.texto)return;
    this.store.dispatch(actions.editar({
      id: this.todo.id,
      texto: this.txtInput.value,
    }))
  }
  eliminarTodo(){
    this.store.dispatch(actions.eliminar({ id: this.todo.id }));
  }
}
