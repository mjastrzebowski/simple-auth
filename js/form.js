(function($) {
  $('form').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var email = form.find('#email').val();
    var password = form.find('#password').val();
    var testEmail = /^([\w-\.\+]+@([\w-]+\.)+[\w-]{2,5})?$/;
    var testPassword = /.*^(?=.{6,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;
    
    if (testEmail.test(email) && testPassword.test(password)) {
      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: 'json',
        data: form.serializeObject(),
        statusCode: {
          201: function() {
            console.log('logowanie poprawne');
            form.fadeOut();
          },
          401: function() {
            console.log('niepoprawny login lub haslo');
          },
          400: function() {
            console.log('niepoprawne dane');
          },
          500: function() {
            console.log('blad uslugi');
          }
        }
      });
    }
  });
})(jQuery);
