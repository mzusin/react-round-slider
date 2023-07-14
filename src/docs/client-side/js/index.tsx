import { initMobileMenu } from './menu/mobile-menu';
import { initMenuCollapsible, initMenuScroll } from './menu/side-menu';
import { handleDarkLightModes } from './dark-mode';
import { initHomePage } from './home-page/home-page';
import { initDocsExamples } from './docs-examples/docs-examples';

const init = () => {
  const $special = document.getElementById('special-page');
  if($special) {
    initHomePage();
    return;
  }

  initMobileMenu();
  initMenuScroll();
  initMenuCollapsible();
  handleDarkLightModes();
  initDocsExamples();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

export {};
