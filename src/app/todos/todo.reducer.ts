import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, editar, eliminar, limpiarCompletados, toggle, toggleAll } from './todo.actions';

export const initialState: Todo[] = [
  new Todo( "Salvar el mundo" ),
  new Todo( "Reunir las gemas del infinito" ),
  new Todo( "Salvar a gamora" ),
  new Todo( "Encontrar a antman" ),
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo( texto )]),
  on(toggle, (state, { id }) => {
    return state.map( todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        }
      } else {
        return todo
      };
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map( todo => {
      if(todo.id === id) {
        return {
          ...todo,
          texto,
        }
      } else {
        return todo;
      };
    });
  }),
  on(eliminar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(toggleAll, (state, { completado }) => state.map(todo => {
    return {
      ...todo,
      completado,
    }
  })),
  on(limpiarCompletados, (state) => state.filter(todo => !todo.completado)),
);

export function todoReducer(state: any, action: any){
  return _todoReducer(state, action);
}
