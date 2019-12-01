import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentComponent } from './intelligent.component';

describe('IntelligentComponent', () => {
  let component: IntelligentComponent;
  let fixture: ComponentFixture<IntelligentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
