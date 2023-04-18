import { debounce as lodashDebounce } from 'lodash-es';
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

const OPTIONS = {
  debounce: 400,
  minLength: 2,
};

const directive = () => ({
  restrict: 'A',
  scope: {
    iamHighlightTextChange: '&?',
    iamHighlightTextOptions: '<?',
  },
  link(scope, element, attributes) {
    const {
      iamHighlightTextChange: change,
      iamHighlightTextOptions: options,
    } = scope;
    const { debounce, minLength } = { ...OPTIONS, ...options };
    const nativeElement = element[0];

    scope.$watch(
      () => attributes[directive.name],
      lodashDebounce((text) => {
        const { innerText } = nativeElement;
        const regExp = new RegExp(`(${text})`, 'gi');

        if (!text || text.length < minLength) {
          nativeElement.innerHTML = innerText;
          return;
        }

        if (regExp.test(innerText)) {
          nativeElement.innerHTML = innerText.replace(
            regExp,
            '<span class="iam-highlight-text">$1</span>',
          );
          if (change) {
            change({ text });
          }
        }
      }, debounce),
    );
  },
});

directive.name = 'iamHighlightText';

export default directive;
