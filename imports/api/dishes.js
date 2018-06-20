import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Dishes = new Mongo.Collection('dishes');

if (Meteor.isServer) {
  Meteor.publish('dishes', function () {
    return Dishes.find({});
  });
}
//resource.action naming convention
Meteor.methods({
  'dishes.insert'(dish) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Dishes.insert({
      name: dish.name,
      price: dish.price,
      description: dish.description,
      type: dish.type,
      nutritionFacts: {
        totalFat: dish.totalFat,
        saturatedFat: dish.saturatedFat,
        transFat: dish.transFat,
        cholesterol: dish.cholesterol,
        sodium: dish.sodium,
        totalCarbohydrates: dish.totalCarbohydrates,
        dietaryFibers: dish.dietaryFibers,
        sugar: dish.sugar,
        protein: dish.protein,
        vitaminA: dish.vitaminA,
        vitaminC: dish.vitaminC,
        calcium: dish.calcium,
        iron: dish.iron
      }
    });
  },
  'dishes.delete'(id) {
    Dishes.remove(id);
  }
});