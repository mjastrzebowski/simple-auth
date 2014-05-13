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
        data: form.serializeObject(),  // { field1: 'value1', ... }
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
        },
        complete: function() {
          runTest();  // run tests
        }
      });
    } else {
      status.text('Niepoprawne dane');
      runTest();  // run tests
    }
  });
})(jQuery);

function runTest() {
  // if there are tests included
  if ((typeof tests) != 'undefined') {
    equal($status.text(), tests[testId].expected_status);
    testId++;
    testStatus();
  }
}
