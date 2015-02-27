
    var main = document.getElementById('selectable-area');
    var a, b, x, y;
    var dragging = false;

    var selector = document.createElement('div');
        selector.className = 'selector';
        selector.alive = false;



/* Events */

    // mousedown
    main.addEventListener('mousedown', function(e) {

        fixWhich(e);

        if(e.which == 1) dragging = true;

        a = e.pageX;
        b = e.pageY;

    }, true);


    // mousemove
    document.addEventListener('mousemove', function(e) {

        if(dragging) {

            x = e.pageX;
            y = e.pageY;

            if(!selector.alive) drawSelector();

            updateSelector(a, b, x, y);
        }


    }, true);


    // mouseup
    document.addEventListener('mouseup', function(e) {

        dragging = false;

        eraseSelector();

    }, true);




/* Functions */

    /*
     * Fix click sent event
     *
     * void
     */
    function fixWhich(e) {
        if (!e.which && e.button) {             // check if mofo IE is used
            if      (e.button & 1) e.which = 1; // left
            else if (e.button & 4) e.which = 2; // middle
            else if (e.button & 2) e.which = 3; // right
        }
    }

    /*
     * Draw the rectangle
     *
     *
     */
    function drawSelector() {

        document.body.appendChild(selector);
        selector.style.opacity = 1;
        selector.alive = true;
    }

    /*
     * Update the rectangle
     *
     *
     */
    function updateSelector(a, b, x, y) {

        // x values
        if (a < x) {
            selector.style.left  = a + 'px';
            selector.style.right = (document.body.clientWidth - x) + 'px';
        } else {
            selector.style.left  = x + 'px';
            selector.style.right = (document.body.clientWidth - a) + 'px';
        }

        // x values
        if (b < y) {
            selector.style.top    = b + 'px';
            selector.style.bottom = (document.body.clientHeight - y) + 'px';
        } else {
            selector.style.top    = y + 'px';
            selector.style.bottom = (document.body.clientHeight - b) + 'px';
        }


    }

    /*
     * Erase the rectangle
     *
     *
     */
    function eraseSelector() {

        selector.style.opacity = 0;

        setTimeout(function () {
            document.body.removeChild(selector);
            selector.alive = false;
        }, 400);
    }
