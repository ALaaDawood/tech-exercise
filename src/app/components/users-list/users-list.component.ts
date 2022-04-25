import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersFilter } from 'src/app/models/users-filter.model';
import { GetUsers } from 'src/app/store/users.actions';
import { UserState } from 'src/app/store/users.state';
import * as js2xmlparser from 'js2xmlparser';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  displayedColumns: string[] = [
    'picture',
    'name',
    'gender',
    'location',
    'email',
    'currentAge',
    'regSeniority',
    'phoneNumber'
  ];

  dataSource!: TableVirtualScrollDataSource<User>;
  @Select(UserState.getUsersFilter)
  private filter$!: Observable<UsersFilter>;
  @Select(UserState.getUsers)
  public users$!: Observable<User[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToUsersFilter();
    this.getUsers();
  }

  subscribeToUsersFilter(): void {
    this.subs.add(this.filter$.subscribe(filter => {
      this.dispatchActionToGetUsers(filter);
    }));
  }

  dispatchActionToGetUsers(filter: UsersFilter) {
    this.store.dispatch(new GetUsers(filter));
  }

  getUsers(): void {
    this.subs.add(
      this.users$.subscribe((users: User[]) => {
        this.dataSource = new TableVirtualScrollDataSource(users);
      })
    );
  }

  exportToXML(): void {
    const fileToExport = new Blob([js2xmlparser.parse('user', this.dataSource)], { type: 'text/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(fileToExport);
    link.target = '_blank';
    link.download = 'export_users.xml';
    link.click();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
