import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';
import { registerFunctions, connect } from './messaging/rpc';

function loadPopup(recipe) {
  const popup = RecipeForm(recipe, console.log.bind(console));
  document.body.appendChild(popup);

  togglePopup()

  registerFunctions({ togglePopup });

  function togglePopup() {
    const { style } = popup;
    const isHidden = style.display && style.display === 'none';
    style.display = isHidden ? 'block' : 'none';
  }
}

connect()
  .call('onTabLoaded', location.host)
  .then(loadPopup)
