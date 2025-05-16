document.addEventListener('DOMContentLoaded', function() {
    // Get all language switcher links
    const languageLinks = document.querySelectorAll('.language-switcher a[data-lang]');
    const noClickLinks = document.querySelectorAll('.no-click');
    
    // Add click handlers to active language switcher links
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPath = window.location.pathname;
            const searchParams = window.location.search;
            const hash = window.location.hash;
            const newLang = this.getAttribute('data-lang');
            
            // Remove current language prefix
            let newPath = currentPath.replace(/^\/(en|es)(\/|$)/, '/');
            
            // Handle homepage case
            if (newPath === '/') {
                newPath = `/${newLang}/`;
            } else {
                newPath = `/${newLang}${newPath}`;
            }
            
            // Preserve query parameters and hash
            window.location.href = newPath + searchParams + hash;
        });
    });
    
    // Prevent clicks on non-clickable language indicators
    noClickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});
