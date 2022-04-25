import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NgxsModule, Store } from '@ngxs/store';
import { MatTableExporterModule } from 'mat-table-exporter';
import { of } from 'rxjs';
import { GetUsers } from 'src/app/store/users.actions';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: Store;
  const storeStub = () => ({ dispatch: (arg: any) => ({}), select: () => of({ gender: 'female', nationality: 'CA' }) });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [
        NgxsModule.forRoot(),
        MatMenuModule,
        MatTableExporterModule
      ],
      providers: [
        { provide: Store, useFactory: storeStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('onInit should getUsers and filters', () => {
    const usersSpy = spyOn(component, 'getUsers');
    const filtersSpy = spyOn(component, 'subscribeToUsersFilter');
    component.ngOnInit();
    expect(usersSpy).toHaveBeenCalledTimes(1);
    expect(filtersSpy).toHaveBeenCalledTimes(1);
  });

  describe('subscribeToUsersFilter', () => {
    it('dispatches action to get users when filters update', () => {
      const storeSpy = spyOn(store, 'dispatch');
      component.subscribeToUsersFilter();
      expect(storeSpy).toHaveBeenCalledWith(new GetUsers({ gender: 'female', nationality: 'CA' }));
    });
  });

  it('should export the table data to xml', () => {
    const spy = spyOn(component, 'exportToXML');

    const menu = fixture.debugElement.nativeElement.querySelector('.export-button');
    menu.click();

    fixture.whenStable().then(() => {
      const button = fixture.debugElement.nativeElement.querySelector('.xml-exporter');
      button.click();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  })
});
