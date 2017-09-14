import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOficinaComponent } from './grid-oficina.component';

describe('GridOficinaComponent', () => {
  let component: GridOficinaComponent;
  let fixture: ComponentFixture<GridOficinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOficinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
