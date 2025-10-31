import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfomartionForm } from './client-information-form';

describe('ClientInfomartionForm', () => {
  let component: ClientInfomartionForm;
  let fixture: ComponentFixture<ClientInfomartionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientInfomartionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInfomartionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
