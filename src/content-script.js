import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';

const popup = RecipeForm({ title: { name: 'title' } }, console.log.bind(console));
document.body.appendChild(popup);

