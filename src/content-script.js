import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';

const recipe = {
  title: { name: 'title' },
  ingredients: { name: 'ingredients' },
  method: { name: 'method' },
};

const popup = RecipeForm(recipe, console.log.bind(console));
document.body.appendChild(popup);

