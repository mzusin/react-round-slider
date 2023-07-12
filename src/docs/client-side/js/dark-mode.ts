const MODE_STORAGE_KEY = 'mode';

export const handleDarkLightModes = () => {

    const mode = window.localStorage.getItem(MODE_STORAGE_KEY) || 'light';
    document.documentElement.classList.toggle('dark', mode === 'dark');

    const $moveToDarkBtn = document.getElementById('move-to-dark-mode-btn') as HTMLButtonElement;
    const $moveToLightBtn = document.getElementById('move-to-light-mode-btn') as HTMLButtonElement;

    const moveToDark = () => {
        document.documentElement.classList.add('dark');
        $moveToDarkBtn.classList.add('hidden');
        $moveToLightBtn.classList.remove('hidden');
        window.localStorage.setItem(MODE_STORAGE_KEY, 'dark');
    };

    const moveToLight = () => {
        document.documentElement.classList.remove('dark');
        $moveToLightBtn.classList.add('hidden');
        $moveToDarkBtn.classList.remove('hidden');
        window.localStorage.setItem(MODE_STORAGE_KEY, 'light');
    };

    if(mode === 'dark'){
        moveToDark();
    }
    else{
        moveToLight();
    }

    $moveToDarkBtn?.addEventListener('click', moveToDark);
    $moveToLightBtn?.addEventListener('click', moveToLight);
};
