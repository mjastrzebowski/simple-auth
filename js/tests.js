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

var $form = $('form');
var $status = $form.find('.status');
var $email = $form.find('#email');
var $password = $form.find('#password');

function testStatus() {
  if (testId < tests.length) {
    $email.val(tests[testId].email);  // set email for test
    $password.val(tests[testId].password);  // set password for test
    $form.trigger('submit');  // submit a form
  } else {
    start();
  }
}

asyncTest('Form status', tests.length, function() {
  testStatus();
});
