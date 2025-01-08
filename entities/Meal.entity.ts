export class Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;

  private ingredients: string[];
  private measures: string[];

  constructor(data: Partial<Meal>) {
    this.idMeal = data.idMeal || '';
    this.strMeal = data.strMeal || '';
    this.strDrinkAlternate = data.strDrinkAlternate || null;
    this.strCategory = data.strCategory || '';
    this.strArea = data.strArea || '';
    this.strInstructions = data.strInstructions || '';
    this.strMealThumb = data.strMealThumb || '';
    this.strTags = data.strTags || '';
    this.strYoutube = data.strYoutube || '';
    this.strSource = data.strSource || '';
    this.strImageSource = data.strImageSource || null;
    this.strCreativeCommonsConfirmed = data.strCreativeCommonsConfirmed || null;
    this.dateModified = data.dateModified || null;

    this.ingredients = this.collectValues(data, 'strIngredient');
    this.measures = this.collectValues(data, 'strMeasure');
  }

  private collectValues(data: Partial<Meal>, prefix: string): string[] {
    return Array.from({ length: 20 }, (_, i) => data[`${prefix}${i + 1}` as keyof Partial<Meal>])
      .filter((value): value is string => !!value);
  }

  getIngredients(): string[] {
    return this.ingredients;
  }

  getMeasures(): string[] {
    return this.measures;
  }

  static build(data: Partial<Meal>): Meal {
    return new Meal(data);
  }
}
