const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        let value = button.dataset.value;
        display.value += value;
    })
});

clearButton.addEventListener('click', function() {
    display.value = '';
});
