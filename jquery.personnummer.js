(function() {
  var $;
  $ = jQuery;
  $.fn.personnr = function(options) {
    var clean, isChecksumValid, isFormatValid;
    options = $.extend({
      onError: function() {},
      onSuccess: function() {},
      validClass: 'valid',
      invalidClass: 'invalid'
    }, options);
    isFormatValid = function(input) {
      if (input != null) {
        return input.match(/^\d\d(?:(0[1-9]|1[1-2]))(?:0[1-9]|[1-2]\d|3[0-1])\d{4}$/g);
      } else {
        return false;
      }
    };
    clean = function(input) {
      input = input.replace(/[-\+]/g, '');
      if (input.length === 12 && (input.indexOf('19') === 0 || input.indexOf('20') === 0)) {
        input = input.substring(2);
      }
      return input;
    };
    isChecksumValid = function(input) {
      var checkDigit, checksum, current, digit, digits, idx, num, res, _len;
      checksum = 0;
      checkDigit = parseInt(input.substring(9), 10);
      digits = (function() {
        var _i, _len, _ref, _results;
        _ref = input.split('').slice(0, 9);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          num = _ref[_i];
          _results.push(parseInt(num, 10));
        }
        return _results;
      })();
      for (idx = 0, _len = digits.length; idx < _len; idx++) {
        digit = digits[idx];
        if (idx % 2 === 0) {
          current = 2 * digit;
          checksum += current > 9 ? current - 9 : current;
        } else {
          checksum += digit;
        }
      }
      if (checksum % 10 !== 0) {
        return (10 - checksum % 10) === checkDigit;
      } else {
        return res = checkDigit === 0;
      }
    };
    return this.each(function() {
      return $(this).bind('change keyup blur', function(e) {
        var self, valid, value;
        self = $(this);
        value = self.val();
        value = clean(value);
        valid = isFormatValid(value) && isChecksumValid(value);
        if (valid) {
          self.addClass(options.validClass);
          self.removeClass(options.invalidClass);
          return options.onSuccess();
        } else {
          self.addClass(options.invalidClass);
          self.removeClass(options.validClass);
          return options.onError();
        }
      });
    });
  };
}).call(this);
