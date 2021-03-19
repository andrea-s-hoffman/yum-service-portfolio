import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  appId: string = 'e99ecff1';
  appKey: string = '8df5af67eab672f5f5ba1f3a28f68503';
  edamamSearchUrl: string = 'https://api.edamam.com/search';
  favorites: any[] = [];

  constructor(private http: HttpClient) {}
  //SEARCH RECIPES CAN TAKE IN AN OBJECT AND IF IT HAS CERTAIN PROPERTIES IT WILL USE THEM FOR PARAMS
  searchRecipes = (searchObject: any): any => {
    console.log(searchObject);
    let params: any = {
      app_id: this.appId,
      app_key: this.appKey,
    };
    if (searchObject.q) {
      params.q = searchObject.q;
    }
    if (searchObject.dietType) {
      params.diet = searchObject.dietType;
    }
    if (searchObject.cookTime) {
      params.time = searchObject.cookTime;
    }
    console.log(params);
    return this.http.get(this.edamamSearchUrl, {
      params: params,
    });
  };

  addFavorite = (recipe: any): void => {
    this.favorites.push(recipe);
    console.log(this.favorites);
  };

  toggleFavorite = (recipe: any): void => {
    let index = this.favorites.findIndex((item) => {
      return item.recipe.label === recipe.recipe.label;
    });
    if (index === -1) {
      this.favorites.push(recipe);
    } else {
      this.favorites.splice(index, 1);
    }
  };
  // index = recipe.id;
  // if (this.favorites.includes(recipe)) {
  //   this.favorites.splice(index, recipe);
  // } else {
  //   this.favorites.push(recipe);
  // }

  getFavorites = (): any[] => {
    return this.favorites;
  };
}
// FIGURE OUT WHY TYPES ARE UNDEFINED FOR TIME OR DIET
// FIGURE OUT WHY RECIPE CARD ISN"T POPULATING RECIPES
