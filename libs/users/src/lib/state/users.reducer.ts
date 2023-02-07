import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models/user';
import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = "users";

export interface UsersState {
  user: User,
  isAuthenticated: boolean
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false
}

const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({ ...state }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
