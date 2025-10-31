import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifTempForm } from './cif-temp-form';

describe('CifTempForm', () => {
  let component: CifTempForm;
  let fixture: ComponentFixture<CifTempForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CifTempForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CifTempForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
