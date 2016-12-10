var svg_trash = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 59"><path d="M29.5 51c.552 0 1-.447 1-1V17c0-.553-.448-1-1-1s-1 .447-1 1v33c0 .553.448 1 1 1zM19.5 51c.552 0 1-.447 1-1V17c0-.553-.448-1-1-1s-1 .447-1 1v33c0 .553.448 1 1 1zM39.5 51c.552 0 1-.447 1-1V17c0-.553-.448-1-1-1s-1 .447-1 1v33c0 .553.448 1 1 1z"/><path d="M52.5 6H38.456c-.11-1.25-.495-3.358-1.813-4.71C35.81.433 34.75 0 33.5 0h-10c-1.252 0-2.31.434-3.144 1.29C19.038 2.64 18.653 4.75 18.543 6H6.5c-.552 0-1 .447-1 1s.448 1 1 1h2.04l1.916 46.02c.037 1.723 1.11 4.98 4.908 4.98h28.272c3.8 0 4.87-3.257 4.907-4.958L50.46 8h2.04c.552 0 1-.447 1-1s-.448-1-1-1zM21.792 2.68C22.24 2.224 22.8 2 23.5 2h10c.7 0 1.26.223 1.707.68.805.824 1.128 2.272 1.24 3.32H20.553c.112-1.048.435-2.496 1.24-3.32zm24.752 51.3c-.006.308-.144 3.02-2.908 3.02H15.364c-2.734 0-2.898-2.717-2.91-3.042L10.543 8h37.915l-1.913 45.98z"/></svg>';

var svg_done = '<svg version="1" xmlns="http://www.w3.org/2000/svg" width="569.333" height="569.333" viewBox="0 0 427.000000 427.000000"><path d="M238.1 183.5C209.8 212.4 186.4 236 186 236c-.4 0-12.3-11.7-26.3-26-14.1-14.3-26-26-26.4-26-.5 0-7 6.2-14.6 13.8L105 211.5l41.8 41.7 41.7 41.7 66.5-64.5c36.6-35.5 66.6-64.9 66.7-65.2.1-.4-7.1-8.2-16-17.5L289.5 131l-51.4 52.5z"/></svg>';

document.getElementById('add').addEventListener('click', function () {
    var input = document.getElementById('input');
    var value = input.value;
    if (value) {
        AddItemToDo(value);
        input.value = "";
    };
});

input.addEventListener('keyup', function (e) {
    var value = input.value;
    if (e.keyCode == 13 && value) {
        AddItemToDo(value)
        input.value = '';
    };
});

function splitLine(length) {
    var div_split_line = document.getElementById('split_line');
    var title = document.getElementById('title_complete');
    if (length > 0) {
        div_split_line.classList.add('split_line');
        title.classList.remove('complete');
    } else {
        div_split_line.classList.remove('split_line');
        title.classList.add('complete');
    }
}

function completeLength() {
    var ulLength = document.getElementById('complete').getElementsByTagName('li').length;
    splitLine(ulLength);
    console.log(ulLength);
}

function RemoveItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode

    parent.removeChild(item)

    completeLength();
}

function doneItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    console.log(item, parent, this)

    var list_complete = document.getElementById('complete');
    list_complete.insertBefore(item, list_complete.childNodes[0]);


    this.classList.remove('done_button');
    this.classList.add('done_button_complete');

    this.addEventListener('click', doneItemUncomplete);
    this.removeEventListener('click', doneItem);


    console.log('complete');

    completeLength();
}

function doneItemUncomplete() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    var list_complete = document.getElementById('todo_simple');
    list_complete.insertBefore(item, list_complete.childNodes[0]);


    this.classList.remove('done_button_complete');
    this.classList.add('done_button');

    this.addEventListener('click', doneItem)
    this.removeEventListener('click', doneItemUncomplete)

    console.log('uncomplete');

    completeLength();
}

function AddItemToDo(text) {
    var list = document.getElementById('todo_simple');

    var item = document.createElement('li');
    item.classList.add('default_tab')
    item.id = ('item');

    var span_text = document.createElement('span');
    span_text.classList.add('todo_simple_text');
    span_text.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('todo_simple_buttons');

    var trash_button = document.createElement('button');
    trash_button.classList.add('trash_button');
    trash_button.id = 'trash_button';
    trash_button.classList.add('button_default');
    trash_button.classList.add('transparent');
    trash_button.innerHTML = svg_trash;
    trash_button.addEventListener('click', RemoveItem);

    var done_button = document.createElement('button');
    done_button.classList.add('done_button');
    done_button.classList.add('transparent');
    done_button.id = 'done_button';
    done_button.innerHTML = svg_done;
    done_button.addEventListener('click', doneItem);

    item.appendChild(span_text);
    item.appendChild(buttons);
    buttons.appendChild(trash_button);
    buttons.appendChild(done_button);

    list.insertBefore(item, list.childNodes[0]);


};