import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ViceContact } from './vice-contact'

describe('ViceContact', () => {
  let component: ViceContact
  let fixture: ComponentFixture<ViceContact>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViceContact],
    }).compileComponents()

    fixture = TestBed.createComponent(ViceContact)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
