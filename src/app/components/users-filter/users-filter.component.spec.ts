import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { UpdateUsersFilter } from 'src/app/store/users.actions';

import { UsersFilterComponent } from './users-filter.component';

describe('UsersFilterComponent', () => {
  let component: UsersFilterComponent;
  let fixture: ComponentFixture<UsersFilterComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersFilterComponent],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot(),
        MatRadioModule,
        MatSelectModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(UsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the filtersForm in onInit', () => {
    const spy = spyOn(component, 'setFiltersForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should allow user to filter by gender', () => {
    const storeSpy = spyOn(store, 'dispatch');

    const formData = {
      gender: 'female',
      nationality: ''
    };
    component.filtersForm.setValue(formData);
    component.filterUsers();

    expect(storeSpy).toHaveBeenCalledWith(new UpdateUsersFilter({ gender: formData.gender, nationality: formData.nationality }));
  });

  it('should allow user to filter by nationality', () => {
    const storeSpy = spyOn(store, 'dispatch');

    const formData = {
      gender: '',
      nationality: 'CA'
    };
    component.filtersForm.setValue(formData);
    component.filterUsers();

    expect(storeSpy).toHaveBeenCalledWith(new UpdateUsersFilter({ gender: formData.gender, nationality: formData.nationality }));
  });

  it('filter button calls the filtering function', () => {
    const spy = spyOn(component, 'filterUsers');

    let button = fixture.debugElement.nativeElement.querySelector('.filter-users');
    button.click();

    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});