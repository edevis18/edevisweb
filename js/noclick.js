(function() {

    const blockAndRedirect = function() {
        clearInterval(interval);
        window.location.href = 'index.html';
    };

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    }, false);

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 123) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.keyCode == 85) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
            e.preventDefault();
        }
    }, false);

    const threshold = 160; 

    const interval = setInterval(function() {
        const start = Date.now();
        
        debugger;
        
        const end = Date.now();
        
   
        if (end - start > threshold) {
            blockAndRedirect();
        }
    }, 1000); 
})();