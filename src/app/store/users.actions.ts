import { UsersFilter } from "src/app/models/users-filter.model";

export class GetUsers {
  public static readonly type = '[Users] get users data';
  constructor(public usersFilter: UsersFilter) { }
}

export class UpdateUsersFilter {
  public static readonly type = '[Users] update users filters';
  constructor(public filters: UsersFilter) { }

}