import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

import * as moment from 'moment';


export class ApiObject {
  _id: string;
  date_created: Date;
  date_modified: Date;

  constructor(kwargs: ApiObject) {
    for (const key in kwargs) {
      if (kwargs.hasOwnProperty(key)) {
        const value = kwargs[key];
        if (key == 'date_created' || key == 'date_modified') {
          this[key] = moment(value).toDate();
        } else {
          this[key] = value;
        }
      }
    }
  }
}


export class ApiData {
  arrays: {
    project: ApiObject[];
    device: ApiObject[];
    user: ApiObject[];
    authorization: ApiObject[];
  }
  project: {
    [project_id: string]: ApiObject;
  };
  device: {
    [device_id: string]: ApiObject;
  };
  raw_data: {
    [device_id: string]: ApiObject[];
  };

  constructor() {
    this.arrays = { project: [], device: [], user: [], authorization: [] };
    this.project = {};
    this.device = {};
    this.raw_data = {};
  }
}


export class ApiDataSelections {
  project: {
    ids: string[];
  };
  device: {
    ids: string[];
  };
  raw_data: {
    dates: {
      begin: Date;
      end: Date;
    };
  };

  constructor() {
    this.project = { ids: [] };
    this.device = { ids: [] };
    let now = new Date();
    this.raw_data = { dates: { begin: moment(now.valueOf() - 60 * 60 * 4 * 1000).toDate(), end: new Date() } }
  }
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private initialized = false;
  private db: ApiData;
  private data_subject: BehaviorSubject<ApiData>;
  public data: Observable<ApiData>;
  private config: ApiDataSelections;
  private selection_subject: BehaviorSubject<ApiDataSelections>;
  public selection: Observable<ApiDataSelections>;

  constructor(private api: ApiService) {
    this.db = new ApiData();
    this.data_subject = new BehaviorSubject<ApiData>(this.db);
    this.data = this.data_subject.asObservable();
    console.log('this.db', JSON.parse(JSON.stringify(this.db)));

    this.config = new ApiDataSelections();
    this.selection_subject = new BehaviorSubject<ApiDataSelections>(this.config);
    this.selection = this.selection_subject.asObservable();
    console.log('this.config', JSON.parse(JSON.stringify(this.config)));
  }

  public init() {
    if (!this.initialized) {
      this.api.get('project').subscribe(
        (api_response) => {
          if (api_response['error']) {
            console.error(api_response['error'])
          } else {
            this.db.project = {};
            for (const project of api_response['data']) {
              this.db.project[project['_id']] = new ApiObject(project);
              this.db.arrays.project.push(new ApiObject(project));
            }
            this.data_subject.next(this.db);
            console.log('this.db', JSON.parse(JSON.stringify(this.db)));
          }
        },
        (err) => { console.error(err); },
      );

      this.api.get('device').subscribe(
        (api_response) => {
          if (api_response['error']) {
            console.error(api_response['error'])
          } else {
            this.db.device = {};
            for (const device of api_response['data']) {
              this.db.device[device['_id']] = new ApiObject(device);
              this.db.arrays.device.push(new ApiObject(device));
            }
            this.data_subject.next(this.db);
            console.log('this.db', JSON.parse(JSON.stringify(this.db)));
          }
        },
        (err) => { console.error(err); },
      );

      this.api.get('raw_data').subscribe(
        (api_response) => {
          if (api_response['error']) {
            console.error(api_response['error'])
          } else {
            this.db.raw_data = {};
            for (const raw_data of api_response['data']) {
              if (!this.db.raw_data.hasOwnProperty(raw_data['device'])) {
                this.db.raw_data[raw_data['device']] = [];
              }
              this.db.raw_data[raw_data['device']].push(new ApiObject(raw_data));
            }
            this.data_subject.next(this.db);
            console.log('this.db', JSON.parse(JSON.stringify(this.db)));
            console.log('this.db, json', this.db);
          }
        },
        (err) => { console.error(err); },
      );

      this.initialized = true;
    }
  }

  public set_project(ids: string[]) {
    this.config.project.ids = ids;
    this.selection_subject.next(this.config);
    console.log('this.config', JSON.parse(JSON.stringify(this.config)));
  }

  public set_device(ids: string[]) {
    this.config.device.ids = ids;
    this.selection_subject.next(this.config);
    console.log('this.config', JSON.parse(JSON.stringify(this.config)));
  }

  public set_dates(begin: Date = new Date(), end: Date = new Date()) {
    this.config.raw_data.dates = { begin: begin, end: end };
    this.selection_subject.next(this.config);
    console.log('this.config', JSON.parse(JSON.stringify(this.config)));
  }
};
