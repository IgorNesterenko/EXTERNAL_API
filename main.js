$(document).ready(function () {
  (function initSteps() {
    $.validator.addMethod(
    "validNickname",
     function (value, element) {
       return /^[a-z]+$/i.test(value);
     }
     ,
     "Should contain only letters"
    );
    $("#form-nickname").validate({
      rules: {
       nickname: {
        required: true,
         minlength: 3,
         maxlength: 15,
         validNickname: true
        }
       }
       ,
       messages: {
       nickname: {
        required: "Please provide a nickname",
         minlength: "Your nickname must be at least 3 characters long",
         maxlength: "Your nickname must be not longer than 15 characters",
         validNickname: "Should contain only letters"
        }
       }
       ,
       submitHandler: function (form) {
         changeStep($('#form-nickname'));
       }
      }
    );
    $.validator.addMethod("validPswd", function (value, element) {
      return /^[\w_]+$/.test(value) && /[0-9]/.test(value) && /[A-Z]/.test(value);
    }
                           , "Your password must be at least 6 characters long and contain numbers");
    $.validator.addMethod('validEmail', function (value, element) {
      return /^([a-zA-Z0-9_.+-])+\@(([\.a-zA-Z0-9-])+)+(\.[a-zA-Z0-9]{2,4})+$/.test(value);
    }
                           , "Please enter a valid email address");
    $("#form-age").validate({
      rules: {
       age: {
        required: true,
         min: 21,
         maxlength: 2
        }
       }
       ,
       messages: {
       age: {
        required: "Please enter your age",
         min: "Your age should be over 21"
        }
       }
       ,
       submitHandler: function (form) {
         changeStep($('#form-age'));
       }
      }
    );
    $("#form-email").validate({
      rules: {
       email: {
        required: true,
         email: true,
         validEmail: true
        }
       }
       ,
       messages: {
       email: {
        required: "Please enter a valid email address"
        }
       }
       ,
       submitHandler: function (form) {
         changeStep($('#form-email'));
       }
      }
    );
    $("#form-password").validate({
      rules: {
       password: {
        required: true,
         minlength: 6,
         maxlength: 16,
         validPswd: true
        }
       }
       ,
       messages: {
       password: {
        required: "Please provide a password",
         minlength: "Your password must be at least 6 characters long",
         maxlength: "Your password must be not longer than 16 characters",
         validPswd: "Your password must be at least 6 characters long and contain numbers"
        }
       }
       ,
       submitHandler: function (form) {
         changeStep($('#form-password'));
       }
      }
    );
    var $loaderItem = $('.icon-heart-inner');
    function changeStep(elm) {
      var $currStep = $(elm).parents('.step');
      $currStep.hide()
      .next('.step')
      .show();
      if( $currStep.attr('data-step') == 6 ) {
        var gender = $('input[name="gender"]:checked').val();
        console.log(gender);
        $('.step-result').addClass(gender);
        $loaderItem.eq(0).addClass('start');
        setTimeout(function(){
          $loaderItem.eq(1).addClass('start');
        }
                    ,500);
        setTimeout(function(){
          $loaderItem.eq(2).addClass('start');
        }
                    ,1000);
        setTimeout(function(){
          $loaderItem.eq(3).addClass('start');
        }
                    ,1500);
        setTimeout(function(){
          $loaderItem.eq(4).addClass('start');
        }
                    ,2000);
        setTimeout(function(){
          $('.step-loading').hide()
          .next('.step')
          .show();
        }
                    ,3000);
      }
    }
    $('.btn-next').on('click', function(){
      changeStep($(this))
    }
                      );
  }
  )();
}
                  );
