/* global $, Stripe */

// Document Ready
$(document).on('turbo:links', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  // Set Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks for submit btn
  submitBtn.click(function(event){
  // Prevent default behaviour
    event.preventDefault();
  // Collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
  
  // Send the card information to stripe
  Stripe.createToken({
    number: ccNum, 
    cvc: cvcNum, 
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
  });
  
  

  // Stripe will return a card token
  // Inject card token as hidden field into form.
  // Submit form to rails app
});