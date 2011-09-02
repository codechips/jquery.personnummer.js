# jquery.personnummer.js

This is a simple jQuery plugin to validate Swedish personal number.
It works by first validating the correct input format and after that
by calculating the checksum. If the checksum is valid it adds class
'valid' to the textbox else it adds 'invalid' class.

## Usage
Add file jquery.personnummer.js to your page after the jquery file.
Then in the dom ready function add the following:

```javascript
$(function() {
  $('#pnr_input').personnr();
});
```

You can also specify some options:
- onError: callback function triggered when the number is invalid
- onSuccess: callback function triggerd when the number is valid
- validClass: css class to add to the texbox when the number is valid
- invalidClass: css class to add to the textbox when the number is invalid

```javascript
$(function() {
  $('#pnr_input').personnr({
    validClass: 'myCustomValidClass',
    invalidClass: 'myCustomInvalidClass',
    onSuccess: function() { alert("Yay! Pnr is valid!")},
    onError: function() { alert("Oh noes! Pnr is invalid.")}
  });
});
```
# About
I needed it, I couldn't find it so I wrote it. In CoffeeScript.

## License
WTFPL
