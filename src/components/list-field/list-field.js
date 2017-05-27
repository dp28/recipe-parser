import template from './list-field.pug';
import { requestPathToList } from '../../dom/selection';
import { BaseField } from '../base-field/base-field';

export const ListField = BaseField({
  template,
  requestSelection: requestPathToList
});
