import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsAddComponent } from './pokemons-add.component';

describe('TestFormComponent', () => {
  let component: PokemonsAddComponent;
  let fixture: ComponentFixture<PokemonsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
