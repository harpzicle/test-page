function clearSelection() { /* stolen from https://stackoverflow.com/questions/6562727/is-there-a-function-to-deselect-all-text-using-javascript */
    var sel;
    if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if ( tagName == "textarea" ||
                    (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}

function copy() {
    document.activeElement.select();
    document.execCommand('copy');
    clearSelection();
}