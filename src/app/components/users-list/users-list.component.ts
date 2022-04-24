import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UsersFilter } from 'src/app/models/users-filter.model';
import { GetUsers } from 'src/app/store/users.actions';
import { UserState } from 'src/app/store/users.state';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  @Select(UserState.getUsersFilter)
  private filter$!: Observable<UsersFilter>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToUsersFilter();
  }

  subscribeToUsersFilter(): void {
    this.subs.add(this.filter$.subscribe(filter => {
      this.dispatchActionToGetUsers(filter);
    }));
  }

  dispatchActionToGetUsers(filter: UsersFilter) {
    this.store.dispatch(new GetUsers(filter));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
