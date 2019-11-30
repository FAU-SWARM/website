import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ExWhyFunctions } from 'src/app/components/raw-data/raw-data.component';

// const DATA = [
//   { "date": "10-05-2012", "close": 68.55, "open": 74.55 },
//   { "date": "09-05-2012", "close": 74.55, "open": 69.55 },
//   { "date": "08-05-2012", "close": 69.55, "open": 62.55 },
//   { "date": "07-05-2012", "close": 62.55, "open": 56.55 },
//   { "date": "06-05-2012", "close": 56.55, "open": 59.55 },
//   { "date": "05-05-2012", "close": 59.86, "open": 65.86 },
//   { "date": "04-05-2012", "close": 62.62, "open": 65.62 },
//   { "date": "03-05-2012", "close": 64.48, "open": 60.48 },
//   { "date": "02-05-2012", "close": 60.98, "open": 55.98 },
//   { "date": "01-05-2012", "close": 58.13, "open": 53.13 },
//   { "date": "30-04-2012", "close": 68.55, "open": 74.55 },
//   { "date": "29-04-2012", "close": 74.55, "open": 69.55 },
//   { "date": "28-04-2012", "close": 69.55, "open": 62.55 },
//   { "date": "27-04-2012", "close": 62.55, "open": 56.55 },
//   { "date": "26-04-2012", "close": 56.55, "open": 59.55 },
//   { "date": "25-04-2012", "close": 59.86, "open": 65.86 },
//   { "date": "24-04-2012", "close": 62.62, "open": 65.62 },
//   { "date": "23-04-2012", "close": 64.48, "open": 60.48 },
//   { "date": "22-04-2012", "close": 60.98, "open": 55.98 },
//   { "date": "21-04-2012", "close": 58.13, "open": 53.13 }
// ];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  data: any[]
  functions: ExWhyFunctions;
  keys: string[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    let data = [];
    this.functions = {};
    this.keys = [];

    this.api.get('raw_data').subscribe(
      (raw_data) => {
        console.log(raw_data);

        Object.keys(raw_data.data[0].raw).forEach(element => {
          this.keys.push(element);
        });

        for (const data of raw_data.data) {
          for (const key in data['raw']) {
            if (data['raw'].hasOwnProperty(key)) {
              if (!this.functions.hasOwnProperty(key)) {
                // let code = `(d) => { return d['raw']['${key}'] }`;
                this.functions[key] = {
                  x: (d) => { return d['date_created']; },
                  y: (d) => { return +d['raw'][key] },
                }
              }
            }
          }
        }
        for (const d of raw_data.data) {
          setTimeout(
            () => {
              d['date_created'] = new Date(d['date_created']);
              data.push(d);
              this.data = data.slice();  // copies the array to force change detect
            }, 1000
          );
        }
        console.log(this.keys);
        console.log(this.functions);
        console.log(this.data);
      },
      (err) => {
        console.error(err);
      },
    );
  }

}
