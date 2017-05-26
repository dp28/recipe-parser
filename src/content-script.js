import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';

const recipe = {
  title: { name: 'title' },
  ingredients: { name: 'ingredients' },
  method: { name: 'method' },
};

const popup = RecipeForm(recipe, console.log.bind(console));
document.body.appendChild(popup);

togglePopup()

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'TOGGLE_POPUP': togglePopup()
  }
});


function togglePopup() {
  const { style } = popup;
  const isHidden = style.display && style.display === 'none';
  style.display = isHidden ? 'block' : 'none';
}
