const COLLAPSIBLE_STORAGE_KEY = 'side-menu';

interface ICollapsible {
    id: string;
    opened: boolean;
}

export const initMenuScroll = () => {
    const $menu = document.querySelector('.side-menu');
    if(!$menu) return;

    const path = window.location.pathname;
    const $link = $menu.querySelector(`a[href='${ path }']`);
    if(!$link) return;

    $link.scrollIntoView({
        block: 'center',
    });
};

const getStateFromStorage = (): ICollapsible[] => {
    const data = window.localStorage.getItem(COLLAPSIBLE_STORAGE_KEY);
    if(!data) return [];

    let menu: ICollapsible[] = [];

    try{
        menu = JSON.parse(data) || [];
    }
    catch(ex){
        // ...
    }

    return menu;
};

const saveStateToStorage = () => {
    const $titles = document.querySelectorAll('.side-menu [data-collapsible-title]');
    const menu: ICollapsible[] = [];

    for(const $title of $titles){
        const id = $title.getAttribute('data-id') || '';
        if(!id) continue;

        const opened = $title.getAttribute('data-opened') === 'true';

        menu.push({
            id,
            opened
        });
    }

    window.localStorage.setItem(COLLAPSIBLE_STORAGE_KEY, JSON.stringify(menu));
};

const restoreCollapsible = () => {
    const menu = getStateFromStorage();
    if(!Array.isArray(menu)) return;

    for(const menuItem of menu){
        const $title = document.querySelector(`.side-menu [data-id="${ menuItem.id }"]`) as HTMLElement;
        if(!$title) continue;

        toggle($title, menuItem.opened, false);
    }
};

const toggle = ($title: HTMLElement, opened: boolean, saveToStorage: boolean) => {

    $title.setAttribute('data-opened', opened.toString());

    const $arrow = $title.querySelector('[data-arrow]');
    if(!$arrow) return;

    $arrow.classList.toggle('rotate-90', opened);
    $title.nextElementSibling?.classList.toggle('hidden', !opened);

    if(saveToStorage){
        saveStateToStorage();
    }
};

export const initMenuCollapsible = () => {
    const $titles = document.querySelectorAll('.side-menu [data-collapsible-title]') as NodeListOf<HTMLElement>;

    for(const $title of $titles){
        $title.addEventListener('click', () => {
            const isOpened = $title.getAttribute('data-opened') === 'true';
            toggle($title, !isOpened, true);
        });
    }

    // try to restore collapsible state on page load
    restoreCollapsible();
};