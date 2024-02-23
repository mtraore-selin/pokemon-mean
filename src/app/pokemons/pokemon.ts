export interface Pokemon {
  id: number;
  pokedexId: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  image: string;
  sprite: string;
  slug: string;
  stats: Base;
  types: {
    name: string;
    image: string;
  }[];

  evolutions: {
    name: string;
    pokedexId: number;
  }[];
}

export interface Base {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp Attack': number;
  'Sp Defense': number;
  Speed: number;
}
