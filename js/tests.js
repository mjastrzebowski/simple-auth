var testId = 0;
var tests = [
  {
    email: '',
    password: '',
    expected_status: 'Niepoprawne dane'
  }, {
    email: 'test',
    password: 'test',
    expected_status: 'Niepoprawne dane'
  }, {
    email: 'test@test.com',
    password: 'Test1',
    expected_status: 'Niepoprawne dane'
  }, {
    email: 'test+test@.com',
    password: 'Test1test',
    expected_status: 'Niepoprawne dane'
  }, {
    email: 'test@test.com',
    password: 'Test1test',
    expected_status: 'Niepoprawny login lub hasło'
  }, {
    email: 'admin@admin.com',
    password: 'Test1test',
    expected_status: 'Niepoprawny login lub hasło'
  }, {
    email: 'admin@admin.com',
    password: 'Admin1',
    expected_status: 'Logowanie poprawne'
  }
];

asyncTest('Form status', tests.length, function() {
  function checkStatus() {
    if (testId < tests.length) {
      var $form = $('form');
      var $status = $form.find('.status');
      var $email = $form.find('#email');
      var $password = $form.find('#password');

      var test = tests[testId];
      $email.val(test.email);
      $password.val(test.password);
      $form.trigger('submit');

      setTimeout(function() {
        equal($status.text(), test.expected_status);
        testId++;
        checkStatus();
      }, 1000);
    } else {
      start();
    }
  }

  checkStatus();
});
