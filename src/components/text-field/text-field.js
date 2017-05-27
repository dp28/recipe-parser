import template from './text-field.pug';
import { requestPathToElement } from '../../dom/selection';
import { BaseField } from '../base-field/base-field';

export const TextField = BaseField({
  template,
  requestSelection: requestPathToElement
});
