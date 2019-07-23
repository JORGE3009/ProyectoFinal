import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosPage } from './articulos.page';

describe('ArticulosPage', () => {
  let component: ArticulosPage;
  let fixture: ComponentFixture<ArticulosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
