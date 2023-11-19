var blessed = require('blessed');
const { isNumberObject } = require('util/types');

// Create a screen object.
var screen = blessed.screen({
    smartCSR: true
});

screen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: '',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: '#aaccff',
    }
});


function showscreen(before,now) {
    box.setContent("Calclator")
    box.setLine(2, `{center}${before}  {black-bg} ${now} {/black-bg}`)
    box.setLine(4, '  ÷ ×  ')
    box.setLine(5, '7 8 9 -')
    box.setLine(6, '4 5 6 +')
    box.setLine(7, '1 2 3  ')
    box.setLine(8, '  0   =')
    screen.render();
}

let state = "op"; // num/op
let number = "-";
let op = "";
let result = 0;

// Append our box to the screen.
screen.append(box);

function numberinput(num) {
    if (state == "op") {
        number = num;
    }
    else if (number=="0") {
        number = num;
    }
    else {
        number += num
    }
    showscreen(result+op,number)
    state = "num"
}
function opinput(nop) {
    if (state=="num") {
        switch (op) {
            case "+":
                result = Number(result)+Number(number)
                break;
            case "-":
                result = Number(result)+Number(number)
                break;
            case "×":
                result = Number(result)*Number(number)
                break;
            case "÷":
                result = Number(result)/Number(number)
                break;
        }
    }
    number = "-";
    op = nop;
    showscreen(result+op,number)
    state = "op";
}
box.key('0', function(ch, key) { numberinput("0");})
box.key('1', function(ch, key) { numberinput("1");})
box.key('2', function(ch, key) { numberinput("2");})
box.key('3', function(ch, key) { numberinput("3");})
box.key('4', function(ch, key) { numberinput("4");})
box.key('5', function(ch, key) { numberinput("5");})
box.key('6', function(ch, key) { numberinput("6");})
box.key('7', function(ch, key) { numberinput("7");})
box.key('8', function(ch, key) { numberinput("8");})
box.key('9', function(ch, key) { numberinput("9");})
box.key('+', function(ch, key) { opinput("+");})
box.key('-', function(ch, key) { opinput("-");})
box.key('×', function(ch, key) { opinput("×");})
box.key('÷', function(ch, key) { opinput("÷");})

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});


// Focus our element.
box.focus();

showscreen("","-")
// Render the screen.
screen.render();