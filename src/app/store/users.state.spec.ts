import { TestBed } from '@angular/core/testing';
import { StateContext } from '@ngxs/store';
import { User } from '../models/user.model';
import { UsersFilter } from '../models/users-filter.model';
import { UserService } from '../services/user.service';
import { GetUsers } from './users.actions';
import { UserState } from './users.state';


describe('UserState', () => {
    let pipe: UserState;
    let usersMock: User[];

    beforeEach(() => {
        const usersServiceStub = () => ({
            getUsers: (filter: UsersFilter) => ({ pipe: () => ({}) }),
        });
        TestBed.configureTestingModule({
            providers: [
                UserState,
                { provide: UserService, useFactory: usersServiceStub }
            ]
        });
        pipe = TestBed.inject(UserState);
        usersMock = [{
            "gender": "female",
            "name": {
                "title": "Mrs",
                "first": "Carry",
                "last": "Hofman"
            },
            "location": {
                "street": {
                    "number": 2955,
                    "name": "It Dwers"
                },
                "city": "Niersen",
                "state": "Noord-Brabant",
                "country": "Netherlands",
                "postcode": 74810,
                "coordinates": {
                    "latitude": "-65.0381",
                    "longitude": "-3.0636"
                },
                "timezone": {
                    "offset": "+9:00",
                    "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
                }
            },
            "email": "carry.hofman@example.com",
            "login": {
                "uuid": "0ae68aef-b246-4e4c-98b1-17fafd0ce7f4",
                "username": "tinykoala972",
                "password": "scorpion",
                "salt": "ggC8O9Zc",
                "md5": "28a81ea2cf582d1c76b5a3a47ff73f8b",
                "sha1": "d238617b0632fa10f0da81cb268c24e7131681bd",
                "sha256": "4eafe1fec1e51abdd0e03c6e501c0ec138952bd98db8755da5cc357ad13e8f1d"
            },
            "dob": {
                "date": "1960-01-05T20:48:19.836Z",
                "age": 62
            },
            "registered": {
                "date": "2002-03-29T22:59:54.247Z",
                "age": 20
            },
            "phone": "(519)-485-8521",
            "cell": "(750)-054-5075",
            "id": {
                "name": "BSN",
                "value": "40887684"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/32.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/32.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/32.jpg"
            },
            "nat": "NL"
        }, {
            "gender": "female",
            "name": {
                "title": "Ms",
                "first": "Daisy",
                "last": "Taylor"
            },
            "location": {
                "street": {
                    "number": 2056,
                    "name": "Nowlin Rd"
                },
                "city": "Fountain Valley",
                "state": "Connecticut",
                "country": "United States",
                "postcode": 68233,
                "coordinates": {
                    "latitude": "-89.7544",
                    "longitude": "-57.5865"
                },
                "timezone": {
                    "offset": "+4:00",
                    "description": "Abu Dhabi, Muscat, Baku, Tbilisi"
                }
            },
            "email": "daisy.taylor@example.com",
            "login": {
                "uuid": "92f7c8d9-32b9-4019-b90b-860ddcac7f3e",
                "username": "orangecat277",
                "password": "sinclair",
                "salt": "0MRyX3Mj",
                "md5": "ac71c32e869eb8de5b2aedec7e0e79b9",
                "sha1": "0b0133b7c4b0f644aa48cc8f3e00ee84fce6eed4",
                "sha256": "3de2f00922ce83605a12141d77569db99dfd2564f7163448c4ab8fcbc601a3f2"
            },
            "dob": {
                "date": "1958-04-19T20:12:27.999Z",
                "age": 64
            },
            "registered": {
                "date": "2015-11-17T02:04:35.168Z",
                "age": 7
            },
            "phone": "(507)-612-9563",
            "cell": "(780)-930-7208",
            "id": {
                "name": "SSN",
                "value": "999-31-2581"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/68.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/68.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/68.jpg"
            },
            "nat": "US"
        }];
    });

    it('can load instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('getUsers', () => {
        it('makes expected calls', () => {
            const stateContextStub: StateContext<any> = <any>{};
            const usersServiceStub: UserService = TestBed.inject(UserService);
            const actionStub: GetUsers = <any>{};
            spyOn(usersServiceStub, 'getUsers').and.callThrough();
            pipe.getUsers(stateContextStub, actionStub);
            expect(usersServiceStub.getUsers).toHaveBeenCalled();
        });
    });
});