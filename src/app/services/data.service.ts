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
  metadata: {
    project: {
      keys: string[];
    };
    device: {
      keys: string[];
    };
    raw_data: {
      keys: string[];
    };
  }
  arrays: {
    raw_data: ApiObject[];
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
    this.metadata = { raw_data: {keys: []}, project: {keys: []}, device: {keys: []} };
    this.arrays = { raw_data: [], project: [], device: [], user: [], authorization: [] };
    this.project = {};
    this.device = {};
    this.raw_data = {};
  }
}


export class ApiDataSelections {
  project: {
    ids: string[];
    keys: string[];
  };
  device: {
    ids: string[];
    keys: string[];
  };
  raw_data: {
    keys: string[];
    dates: {
      begin: Date;
      end: Date;
    };
  };

  constructor() {
    this.project = { ids: [], keys: [] };
    this.device = { ids: [], keys: [] };
    let now = moment();
    this.raw_data = { keys: [], dates: { begin: (now.subtract({'days': 2})).toDate(), end: moment().toDate() } }
  }
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
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

    this.config = new ApiDataSelections();
    this.selection_subject = new BehaviorSubject<ApiDataSelections>(this.config);
    this.selection = this.selection_subject.asObservable();
  }

  public init() {
    this.api.get('project').subscribe(
      (api_response) => {
        if (api_response['error']) {
          console.error(api_response['error'])
        } else {
          let keys = {};
          this.db.project = {};
          for (const project of api_response['data']) {
            Object.keys(project).forEach((key) => {keys[key] = true});
            this.db.project[project['_id']] = new ApiObject(project);
            this.db.arrays.project.push(new ApiObject(project));
          }
          this.db.metadata.project.keys = Object.keys(keys);
          this.data_subject.next(this.db);
        }
      },
      (err) => { console.error(err); },
    );

    this.api.get('device').subscribe(
      (api_response) => {
        if (api_response['error']) {
          console.error(api_response['error'])
        } else {
          let keys = {};
          this.db.device = {};
          for (const device of api_response['data']) {
            Object.keys(device).forEach((key) => {keys[key] = true});
            this.db.device[device['_id']] = new ApiObject(device);
            this.db.arrays.device.push(new ApiObject(device));
          }
          this.db.metadata.device.keys = Object.keys(keys);
          this.data_subject.next(this.db);
        }
      },
      (err) => { console.error(err); },
    );

    this.api.get('raw_data').subscribe(
      (api_response) => {
        if (api_response['error']) {
          console.error(api_response['error'])
        } else {
          let keys = {};
          this.db.raw_data = {};
          for (const raw_data of api_response['data']) {
            // Object.keys(raw_data).forEach((key) => {keys[key] = true});
            Object.keys(raw_data['raw']).forEach((key) => {keys[key] = true});
            if (!this.db.raw_data.hasOwnProperty(raw_data['device'])) {
              this.db.raw_data[raw_data['device']] = [];
            }
            this.db.raw_data[raw_data['device']].push(new ApiObject(raw_data));
            this.db.arrays.raw_data.push(new ApiObject(raw_data));
          }
          this.db.metadata.raw_data.keys = Object.keys(keys);
          this.data_subject.next(this.db);
        }
      },
      (err) => { console.error(err); },
    );

  }

  public set_project(ids: string[]) {
    this.config.project.ids = ids;
    this.selection_subject.next(this.config);
  }

  public set_device(ids: string[]) {
    this.config.device.ids = ids;
    this.selection_subject.next(this.config);
  }

  public set_dates(begin: Date = new Date(), end: Date = new Date()) {
    this.config.raw_data.dates = { begin: begin, end: end };
    this.selection_subject.next(this.config);
  }

  public set_raw_data_keys(keys: string[]) {
    this.config.raw_data.keys = keys;
    this.selection_subject.next(this.config);
  }
};
