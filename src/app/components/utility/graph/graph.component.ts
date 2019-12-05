import { ChangeDetectionStrategy, SimpleChanges, Component, ElementRef, Input, OnInit, OnChanges, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService, ApiData, ApiDataSelections } from 'src/app/services/data.service';
import { BehaviorSubject, Observable } from 'rxjs';

import * as d3 from 'd3';


export interface DomainRange {
  domain: number[];
  range: number[];
}

export function random(length) {
  return Math.floor(Math.random() * length)
}

export const COLOR_MAP = {
  'NAVY': '#001f3f',
  'BLUE': '#0074D9',
  'AQUA': '#7FDBFF',
  'TEAL': '#39CCCC',
  'OLIVE': '#3D9970',
  'GREEN': '#2ECC40',
  'LIME': '#01FF70',
  'YELLOW': '#FFDC00',
  'ORANGE': '#FF851B',
  'RED': '#FF4136',
  'MAROON': '#85144b',
  'FUCHSIA': '#F012BE',
  'PURPLE': '#B10DC9',
  'BLACK': '#111111',
  'GRAY': '#AAAAAA',
  'SILVER': '#DDDDDD'
}
export const COLORS = Object.keys(COLOR_MAP);

export interface ExWhyFunctions {
  [name: string]: {
    x: any;  // d3 functions
    y: any;  // d3 functions
  };
}

export interface D3Dimensions {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  width: number;
  height: number;
};

export interface D3Chart {
  x_axis: any;
  y_axis: any;
  // set the ranges
  x_scale: any;
  y_scale: any;
  lines: {
    // https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f
    [name: string]: any;  // d3 calls them dataline
  };
  tooltip: any;
};


@Component({
  selector: 'app-utility-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityGraphComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: {
    [device_id: string]: any[];
  };
  @Input() functions: ExWhyFunctions;
  @Input() columns: string[];
  @ViewChild('tooltip', { static: false }) private tooltip: any = null;
  private element: any = null;
  db: ApiData;
  selections: ApiDataSelections;

  private svg: any = null;
  private g: any = null;
  private dimensions: D3Dimensions;
  private chart: D3Chart;
  private colors: { key: string; color: string }[];
  private random_sequence = [];
  private domain_range: DomainRange;

  private view_initialized: BehaviorSubject<boolean>;
  private tooltip_sustain = false;

  constructor(private _element: ElementRef, private ds: DataService) {
    this.view_initialized = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.dimensions = {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      width: 0,
      height: 0,
    };
    this.chart = {
      x_axis: null,
      y_axis: null,
      x_scale: null,
      y_scale: null,
      lines: {},
      tooltip: null,
    }
    let original_sequence = COLORS.map((e, i) => { return i; });
    this.random_sequence = [];
    let original_length = original_sequence.length;
    for (let i = 0; i < original_length; i++) {
      let victim = random(original_sequence.length);
      this.random_sequence.push(original_sequence[victim]);
      original_sequence.splice(victim, 1);
    }

    this.ds.selection.subscribe(
      (selections) => {
        this.selections = selections;
        this.ds.data.subscribe(
          (db) => {
            this.db = db;
          }
        );
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.view_initialized.subscribe(
      (view_initialized) => {
        if (view_initialized) {
          this.create_chart();
        }
      }
    )
  }

  ngAfterViewInit() {
    this.view_initialized.next(true);
  }

  __parse_date = d3.timeParse('%d-%m-%Y');  // tis a func

  onResize($event) {
    this.create_chart();
  }

  private create_chart() {
    this.__setup();
    this.__build();
    this.__populate();
    this.__draw_axes('time', 'everything');
    this.__legend();
  }

  private __setup() {
    this.element = this._element.nativeElement;
    this.dimensions.margin = {
      top: 15,
      right: 15,
      bottom: 65,
      left: 65,
    };
    this.dimensions.width = this.element.offsetWidth - this.dimensions.margin.left - this.dimensions.margin.right;
    this.dimensions.height = 3 * window.outerHeight / 4 - this.dimensions.margin.bottom - this.dimensions.margin.top;

    this.domain_range = {
      domain: [],
      range: [],
    };

    for (const device_id in this.data) {
      if (this.data.hasOwnProperty(device_id)) {
        const data = this.data[device_id];
        for (const d of data) {
          this.domain_range.domain.push(d['date_created'])
        }
      }
    }

    for (const func in this.functions) {
      if (this.columns.find((col) => {return col === func}) && this.functions.hasOwnProperty(func) && !(func.toLowerCase() === 'date')) {
        const functions = this.functions[func];
        for (const device_id in this.data) {
          if (this.data.hasOwnProperty(device_id)) {
            const data = this.data[device_id];
            for (const d of data) {
              this.domain_range.range.push(functions.y(d))
            }
          }
        }
      }
    }

    // setting range and setting domain are 2 different steps
    this.chart.x_scale = d3.scaleTime()
      .domain([d3.min(this.domain_range.domain), d3.max(this.domain_range.domain)])
      .range([0, this.dimensions.width]);
    this.chart.y_scale = d3.scaleLinear()
      .domain([d3.min(this.domain_range.range), d3.max(this.domain_range.range)])
      .range([this.dimensions.height, 0]);

    this.chart.x_axis = d3.axisBottom(this.chart.x_scale)
      .ticks(5)
      .tickPadding(15);
    this.chart.y_axis = d3.axisLeft(this.chart.y_scale)
      .ticks(5)
      .tickPadding(10);
  }

  private __build() {
    // d3 namespace
    let _this = this;
    d3.select(_this.element).select('svg').remove();
    this.svg = d3.select(_this.element).append('svg')
      .attr('width', _this.dimensions.width + _this.dimensions.margin.left + _this.dimensions.margin.right)
      .attr('height', _this.dimensions.height + _this.dimensions.margin.top + _this.dimensions.margin.bottom)
      .on('click', (d) => {
        _this.tooltip_sustain = !_this.tooltip_sustain;
        _this.chart.tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      })
    this.g = this.svg.append('g')
      .attr('transform', `translate(${_this.dimensions.margin.left},${_this.dimensions.margin.top})`);

    // tooltip generation
    this.chart.tooltip = d3.select(this.tooltip.nativeElement);
  }

  private __draw_axes(x_label: string, y_label: string) {
    // d3 namespace
    let _this = this;
    let x_axis = this.g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${_this.dimensions.height - this.dimensions.margin.bottom})`)
      .call(_this.chart.x_axis)
      .append('text')
      .attr('class', 'label')
      .attr('x', _this.dimensions.width)
      .attr('y', -12)
      .style('text-anchor', 'end')
      .style('fill', 'grey')
      .text(x_label);

    let y_axis = this.g.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${_this.dimensions.margin.left},0)`)
      .call(_this.chart.y_axis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 12)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('fill', 'grey')
      .text(y_label);
  }

  private __populate() {
    // d3 namespace
    let _this = this;
    this.chart.lines = {};

    let color_i = 0;
    this.colors = [];
    console.log(this.data)
    for (const device_id in this.data) {
      if (this.data.hasOwnProperty(device_id)) {
        const data = this.data[device_id];

        for (const func in this.functions) {
          if (
            this.columns.find((col) => {return col === func}) &&
            this.functions.hasOwnProperty(func) &&
            !(func.toLowerCase() === 'date')) {
            const functions = this.functions[func];

            let dataline = d3.line()
              // d3 namespace
              .x((d) => { return _this.chart.x_scale(functions.x(d)); })
              .y((d) => { return _this.chart.y_scale(functions.y(d)); });

            // data line generation
            this.chart.lines[func] = dataline;
            let stroke = COLOR_MAP[COLORS[this.random_sequence[color_i]]];
            color_i += 1;
            if (color_i == this.random_sequence.length)
              color_i = 0;
            this.g.append('path')
              // d3 namespace
              .data([data])
              .attr('class', `line`)
              // https://stackoverflow.com/questions/14765036/d3-line-chart-filling-at-arbitrary-line
              .style('fill', 'none')
              .style('stroke', stroke)
              .style('stroke-width', '2px')
              .attr('d', dataline);

            this.g.selectAll('.dot')
              .data(data)
              .enter()
              .append('circle')
              .attr('r', 5)
              .attr('cx', (d) => { return _this.chart.x_scale(functions.x(d)); })
              .attr('cy', (d) => { return _this.chart.y_scale(functions.y(d)); })
              .attr('stroke', 'black')
              .attr('stroke-width', 1.5)
              .style('fill', 'white')
              .style('cursor', 'pointer')
              .on('click', (d) => {
                _this.tooltip_sustain = !_this.tooltip_sustain;
              })
              .on('mouseover', (d) => {
                _this.chart.tooltip.transition()
                  .duration(250)
                  .style('opacity', 0.9);
                _this.chart.tooltip.html(`date: ${functions.x(d)}<br>type: ${func}<br>value: ${functions.y(d)}<br>device: ${_this.db.device[device_id]['name']}`)
                  .style('left', (d3.event.pageX / 2) + 'px')
                  .style('top', (d3.event.pageY / 2) + 'px');
              })
              .on('mouseout', (d) => {
                if (!_this.tooltip_sustain) {
                  _this.chart.tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
                }
              });

            try {
              this.colors.push({ key: `${this.db.device[device_id]['name']} ${func}`, color: stroke });
            } catch (error) {
              console.error(device_id, error)
            }
          }
        }
      }
    }
  }

  // https://www.d3-graph-gallery.com/graph/custom_legend.html
  private __legend() {
    // d3 namespace
    let _this = this;
    var size = 20;
    this.svg.selectAll('mydots')
      .data(this.colors)
      .enter()
      .append('rect')
      .attr('x', _this.dimensions.width * 3 / 5)
      .attr('y', function (d, i) { return 100 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr('width', size)
      .attr('height', size)
      .style('fill', (d) => { return d.color })

    // Add one dot in the legend for each name.
    this.svg.selectAll('mylabels')
      .data(this.colors)
      .enter()
      .append('text')
      .attr('x', _this.dimensions.width * 3 / 5 + size * 1.2)
      .attr('y', (d, i) => { return 100 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
      .style('fill', (d) => { return d.color })
      .text((d) => { return d.key })
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')
  }
}
