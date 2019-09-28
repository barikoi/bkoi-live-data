import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseGeoComponent } from './reverse-geo.component';

describe('ReverseGeoComponent', () => {
  let component: ReverseGeoComponent;
  let fixture: ComponentFixture<ReverseGeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseGeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
