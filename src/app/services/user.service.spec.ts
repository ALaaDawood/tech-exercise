import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UsersAPIResponse, UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getUsers', () => {
    let expectedUsers: UsersAPIResponse;

    beforeEach(() => {
      service = TestBed.inject(UserService);
      expectedUsers = {
        results: [{
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
        }]
      };
    });

    it('should return expected users (called once)', () => {
      service.getUsers().subscribe({
        next: users => expect(users)
          .withContext('should return expected users')
          .toEqual(expectedUsers),
        error: fail
      });

      const req = httpTestingController.expectOne(service.usersApiUrl +
        '?results=200&inc=gender,picture,name,location,email,dob,phone,registered');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedUsers);
    });

    it('should be OK returning no users', () => {
      service.getUsers().subscribe({
        next: users => {
          expect(users.results.length)
            .withContext('should have empty users array')
            .toEqual(0);
          expect(users)
            .withContext('should return expected users')
            .toEqual({
              results: []
            })
        },
        error: fail
      });

      const req = httpTestingController.expectOne(service.usersApiUrl +
        '?results=200&inc=gender,picture,name,location,email,dob,phone,registered');
      req.flush([]);
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      service.getUsers().subscribe({
        next: users => fail('expected to fail'),
        error: error => expect(error.message).toContain(msg)
      });

      const req = httpTestingController.expectOne(service.usersApiUrl
        + '?results=200&inc=gender,picture,name,location,email,dob,phone,registered');

      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected users (called multiple times)', () => {
      service.getUsers().subscribe();
      service.getUsers().subscribe({
        next: users => expect(users)
          .withContext('should return expected users')
          .toEqual(expectedUsers),
        error: fail
      });

      const requests = httpTestingController.match(service.usersApiUrl
        + '?results=200&inc=gender,picture,name,location,email,dob,phone,registered');
      expect(requests.length)
        .withContext('calls to getUsers()')
        .toEqual(2);

      requests[0].flush([]);
      requests[1].flush(expectedUsers);
    });
  });

});
