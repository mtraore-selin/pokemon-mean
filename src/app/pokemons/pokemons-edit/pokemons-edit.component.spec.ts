import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsEditComponent } from './pokemons-edit.component';

describe('PokemonsEditComponent', () => {
  let component: PokemonsEditComponent;
  let fixture: ComponentFixture<PokemonsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
