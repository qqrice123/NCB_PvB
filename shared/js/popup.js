// Popup Banner
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popupBanner');
    const closeBtn = document.getElementById('popupClose');
    const floater = document.getElementById('popupFloater');
    if (!popup) return;

    const openPopup = () => {
        popup.classList.add('active');
        if (floater) floater.classList.remove('active');
    };

    const closePopup = () => {
        popup.classList.remove('active');
        if (floater) floater.classList.add('active');
        sessionStorage.setItem('popupShown', 'true');
    };

    if (!sessionStorage.getItem('popupShown')) {
        openPopup();
    } else {
        if (floater) floater.classList.add('active');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });

});
