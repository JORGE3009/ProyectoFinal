import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavellonPage } from './pavellon.page';

describe('PavellonPage', () => {
  let component: PavellonPage;
  let fixture: ComponentFixture<PavellonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavellonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavellonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
