"strict mode";


    var main  = document.getElementById('selectable-area');
    var items = document.querySelectorAll('.selectable-area .selectable-item');
    var a, b, x, y, i;
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


        // Check if it is an item
        if(e.target.classList.contains('item')) {

            if(!e.ctrlKey) {
                for(i = 0; i < items.length; i++) {
                    items[i].classList.remove('selected');
                }
            }

            e.target.classList.toggle('selected');

        } else {

            for(i = 0; i < items.length; i++) {
                items[i].classList.remove('selected');
            }
        }

    }, true);


    // mousemove
    document.addEventListener('mousemove', function(e) {

        if(dragging) {

            x = e.pageX;
            y = e.pageY;

            if(!selector.alive) drawSelector();

            updateSelector(a, b, x, y);

            for(i = 0; i < items.length; i++) {

                if((items[i].offsetTop > Math.min(b, y)  || items[i].offsetTop + items[i].offsetHeight > Math.min(b, y))
                    && (items[i].offsetTop < Math.max(b, y)  || items[i].offsetTop + items[i].offsetHeight < Math.max(b, y))
                    && (items[i].offsetLeft > Math.min(a, x) || items[i].offsetLeft + items[i].offsetWidth > Math.min(a, x))
                    && (items[i].offsetLeft < Math.max(a, x) || items[i].offsetLeft + items[i].offsetWidth < Math.max(a, x))
                ) {

                    items[i].classList.add('selected');

                } else {

                    items[i].classList.remove('selected');
                }
            }
        }


    }, true);


    // mouseup
    document.addEventListener('mouseup', function() {

        dragging = false;

        if(selector.alive) eraseSelector();

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
