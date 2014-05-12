// fn based on http://css-tricks.com/snippets/jquery/serialize-form-to-json/
$.fn.serializeObject = function(){
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};


(function($) {

  // floated labels from http://codepen.io/soulrider911/pen/ugnyl
  function floatLabel(inputType) {
    $(inputType).each(function() {
      var $this = $(this);
      // on focus add class active to label
      $this.focus(function() {
        $this.next().addClass('active');
      });
      // on blur check field and remove class if needed
      $this.blur(function() {
        if ($this.val() === '' || $this.val() === 'blank') {
          $this.next().removeClass();
        }
      });
    });
  }
  floatLabel('.controls input');


  // actual form handling

  $('form').submit(function(e) {
    e.preventDefault();
    console.log($(this).serializeObject());
    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'json',
      data: $(this).serializeObject(),
      statusCode: {
        201: function() {
          alert('logowanie poprawne');
        },
        401: function() {
          alert('niepoprawny login lub haslo');
        },
        400: function() {
          alert('niepoprawne dane');
        },
        500: function() {
          alert('blad uslugi');
        }
      }
    });
  });
})(jQuery);
