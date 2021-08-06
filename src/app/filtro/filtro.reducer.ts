import { createReducer, on } from '@ngrx/store';
import { setFiltro } from './filtro.actions';

export const initialState: any = 'todos';

const _filtroReducer = createReducer(
  initialState,
  on(setFiltro, (state, { filtro }) => filtro),
);

export function filtroReducer(state: any, action: any) {
  return _filtroReducer(state, action);
}
