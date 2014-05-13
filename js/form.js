(function($) {
  $('form').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var status = form.find('.status');
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
            status.text('Logowanie poprawne');
            form.find('fieldset').slideUp();
          },
          401: function() {
            status.text('Niepoprawny login lub hasło');
          },
          400: function() {
            status.text('Niepoprawne dane');
          },
          500: function() {
            status.text('Błąd usługi');
          }
        }
      });
    } else {
      status.text('Niepoprawne dane');
    }
  });
})(jQuery);
