
function (e, t) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  },
  e.fn.colorize = function (i, n, r) {
    return this.options = r || {
    },
    this.possibleOptions = {
      fontFace: [
        'roboto',
        'droidSerif'
      ],
      fontSize: [
        'automatic',
        'normal',
        'small',
        'medium',
        'big',
        'ultra'
      ],
      fontColor: [
        'black',
        'white',
        'gray',
        'green'
      ],
      backgroundColor: [
        'bright',
        'dark',
        'black'
      ],
      chatLocation: [
        'floating',
        'bottom'
      ]
    },
    this.getOption = function (e) {
      if (!(!e in t)) return t[e]
    },
    this.checkOption = function (e, t) {
      return !(!e in this.possibleOptions) && this.possibleOptions[e].indexOf(t) !== !1
    },
    this.setCookie = function (t, i) {
      e.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': this.options.token
        }
      }),
      e.ajax({
        url: this.options.url,
        method: 'post',
        data: {
          key: t,
          value: i
        }
      })
    },
    this.setOption = function (e, i) {
      var n = this.getOption(e);
      return this.removeClass(e + n.capitalize()),
      !!this.checkOption(e, i) && (t[e] = i, this.addClass(e + i.capitalize()), this.setCookie(e, i), !0)
    },
    this.setOption(i, n)
  }
}(jQuery, lnmtl);