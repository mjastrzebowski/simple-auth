(function($) {
  function floatLabel(inputType) {
    $(inputType).each(function() {
      var $this = $(this);
      // on focus add class active to label
      $this.focus(function() {
        $this.next().addClass("active");
      });
      // on blur check field and remove class if needed
      $this.blur(function() {
        if($this.val() === '' || $this.val() === 'blank') {
          $this.next().removeClass();
        }
      });
    });
  }
  // just add a class of "floatLabel to the input field!"
  floatLabel(".controls input");

  $('form').submit(function(e) {
    e.preventDefault();
    console.log('test form');
  });
})(jQuery);
