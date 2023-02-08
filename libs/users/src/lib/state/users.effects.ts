import { LocalstorageService } from './../services/localstorage.service';
import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";

import * as UsersActions from "./users.actions";
import * as UsersFeature from "./users.reducer";

import { switchMap, catchError, of, concatMap } from "rxjs";

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if (this.localStorageService.isValidToken()) {

      } else {

      }
    })
  ));


  constructor(private actions$: Actions, private localStorageService: LocalstorageService) { }


}
