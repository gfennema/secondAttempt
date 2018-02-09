/* global $, Stripe */

// Document Ready
$(document).on('turbo:links', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  // Set Stripe Public Key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit button,
  submitBtn.click(function(event){
    // prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
  })
  
  // When user clicks for submit btn
  submitBtn.click(function(event){
  // Prevent default behaviour
    event.preventDefault();
  // Collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
  // Use Stripe js library to check for card errors
  var error = false;
  
  // Validate Card Number.
  if(!Stripe.card.validateCardNumber(ccNum)) {
    error = true;
    alert('The credit card number appears to be invalid.');
  }
  
  // Validate CVC Number.
  if(!Stripe.card.validateCVC(cvcNum)) {
    error = true;
    alert('The CVC number appears to be invalid.');
  }  
  
  // Validate expiry date.
  if(!Stripe.card.validateExpiry(expMonth, expYear)) {
    error = true;
    alert('The expiration date appears to be invalid');
  }  
  
  if (error) {
    // If there are card errors, do not send to stripe
    submitBtn.prop('disabled', false).val("SignUp");
   } else {
       // Send the card information to stripe
      Stripe.createToken({
        number: ccNum, 
        cvc: cvcNum, 
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
  
    return false;
  });
  
  // Stripe will return a card token
  function stripeResponseHandler(status, response) {
    // Get the token from the response
    var token = response.id;
    // Inject card token as hidden field into form.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Submit form to rails app
    theForm.get(0).submit();
  }
});