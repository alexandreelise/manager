import { debounce } from 'lodash-es';
import './highlightText.styles.scss';

/**
 * @description
 * This directive highlights text inside the element on witch it is set
 * by modifying its innerHTML
 *
 * <div
 *   data-iam-highlight-text="super"
 *   data-iam-highlight-text-change="doSomethingWith(text)"
 *   data-iam-highlight-text-options="{ debounce: 400, minLength: 2 }"
 * >
 *   My super text
 * </div>
 *
 * Will result in
 *
 * <div>My <span class="iam-highlight-text">super</span> text</div>
 */

const defaultOptions = {
  debounce: 400,
  minLength: 2,
};

export default () => ({
  scope: {
    iamHighlightTextChange: '&?',
    iamHighlightTextOptions: '<?',
  },
  link(scope, angularElement, attributes) {
    const {
      iamHighlightTextChange: onChange,
      iamHighlightTextOptions: options,
    } = scope;
    const { debounce: debounceTime, minLength } = {
      ...defaultOptions,
      ...options,
    };
    const element = angularElement[0];

    scope.$watch(
      () => attributes.iamHighlightText,
      debounce((text) => {
        const { innerText } = element;
        const regExp = new RegExp(`(${text})`, 'gi');

        if (!text || text.length < minLength) {
          element.innerHTML = innerText;
          return;
        }

        if (regExp.test(innerText)) {
          element.innerHTML = innerText.replace(
            regExp,
            '<span class="iam-highlight-text">$1</span>',
          );
          if (onChange) {
            onChange({ text });
          }
        }
      }, debounceTime),
    );
  },
});
