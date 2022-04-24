import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { GetUsers, UpdateUsersFilter } from "./users.actions";
import { tap } from 'rxjs/operators';
import { UsersFilter } from "../models/users-filter.model";

export interface UsersStateModel {
  users: User[];
  filters: UsersFilter;
}

@State<UsersStateModel>({
  name: 'alertsState',
  defaults: {
    users: [],
    filters: {}
  }
})

@Injectable()
export class UserState {
  constructor(private userService: UserService) { }

  @Selector()
  public static getUsers(state: UsersStateModel): User[] {
    return state.users;
  }

  @Selector()
  public static getUsersFilter(state: UsersStateModel): UsersFilter {
    return state.filters;
  }


  @Action(GetUsers)
  public getUsers({ patchState }: StateContext<UsersStateModel>, { usersFilter }: GetUsers) {
    return this.userService.getUsers(usersFilter).pipe(
      tap(res => {
        patchState({ users: res.results });
      }));
  }

  @Action(UpdateUsersFilter)
  public updateFilters({ patchState }: StateContext<UsersStateModel>, { filters }: UpdateUsersFilter) {
    patchState({ filters });
  }
}
