$ = jQuery

$.fn.personnr = (options) ->
  options = $.extend
    onError: ->
    onSuccess: ->
    validClass: 'valid'
    invalidClass: 'invalid'
  , options

  isFormatValid = (input) ->
    if input? then input.match /^\d\d(?:(0[1-9]|1[1-2]))(?:0[1-9]|[1-2]\d|3[0-1])\d{4}$/g else false

  clean = (input) ->
    input = input.replace(/[-\+]/g, '')
    if input.length is 12 and (input.indexOf('19') == 0 or input.indexOf('20') == 0)
      input = input.substring(2)
    input

  isChecksumValid = (input) ->
    checksum = 0
    checkDigit = parseInt(input.substring(9), 10)
    digits = (parseInt(num, 10) for num in input.split('')[0...9])
    for digit, idx in digits
      if idx % 2 == 0
        current = 2 * digit
        checksum += if current > 9 then current - 9 else current
      else
        checksum += digit
    if checksum % 10 isnt 0
      (10 - checksum % 10) == checkDigit
    else
      res = checkDigit == 0

  @each ->
    $(@).bind 'change keyup blur', (e) ->
      self = $(@)
      value = self.val()
      value = clean(value)
      valid = isFormatValid(value) and isChecksumValid(value)
      if valid
        self.addClass(options.validClass)
        self.removeClass(options.invalidClass)
        options.onSuccess()
      else
        self.addClass(options.invalidClass)
        self.removeClass(options.validClass)
        options.onError()
