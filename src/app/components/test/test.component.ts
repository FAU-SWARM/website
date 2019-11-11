import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  data: any[];
  keys: string[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.data = [];
    this.keys = [];
    this.api.get('raw_data').subscribe(
      (raw_data) => {
        console.log(raw_data);

        Object.keys(raw_data.data[0]).forEach(element => {
          this.keys.push(element);
        });
        Object.keys(raw_data.data[0].raw).forEach(element => {
          this.keys.push(element);
        });

        for (const data of raw_data.data) {
          let obj = {};
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              obj[key] = data[key]
            }
          }
          for (const key in data.raw) {
            if (data.raw.hasOwnProperty(key)) {
              obj[key] = data.raw[key]
            }
          }
          this.data.push(obj)
        }
        console.log(this.keys);
        console.log(this.data);
      },
      (err) => {
        console.error(err);
      },
    )
  }

}
