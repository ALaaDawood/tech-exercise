import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateUsersFilter } from 'src/app/store/users.actions';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.sass']
})
export class UsersFilterComponent implements OnInit {
  filtersForm!: FormGroup;
  supportedNationalities = [
    'AU', 'BR', 'CA',
    'CH', 'DE', 'DK',
    'ES', 'FI', 'FR',
    'GB', 'IE', 'IR',
    'NO', 'NL', 'NZ',
    'TR', 'US'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.setFiltersForm();
  }

  setFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      gender: new FormControl(null),
      nationality: new FormControl(null)
    });
  }

  filterUsers(): void {
    this.store.dispatch(new UpdateUsersFilter(this.filtersForm.value));
  }
}
