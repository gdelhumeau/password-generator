//***********************************************
// Generate a strong password from a private key
// and a website name.
//**********************************************
$(document).ready(function() {

  var letters = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];
  var numbers = ['0','1','2','3','4','5','6','7','8','9'];
  var specials = ['#','&','~','%','@','^','$','§','?','.','-','[',']','=','/', '+', '*'];
  
  var defaultSet = [].concat(numbers).concat(letters);
  
  // ***************************************
  // Function that generates a hash from a string
  // ***************************************
  var generateHash = function (tocrypt, set, length) {
    var hash = hex_sha256(tocrypt);
    var result = '';
    for (var i=0; i <length; i++) {
      var a = Number("0x"+ hash.substr(i*2,2));
      result = result + set[a % set.length];
    }
    return result;
  }
    
  // ***************************************
  // Function that generates a hash from a string
  // ***************************************
  var generateHashNumbers = function (tocrypt) {
    var set = numbers;
    var hash = hex_sha256(tocrypt);
    var result = '';
    for (var i=0; i < 10; i++) {
      var a = Number("0x"+ hash.substr(i*2,2));
      result = result + set[a % set.length];
    }
    return result;
  }

  // ***************************************
  // Function that generates the password
  // ***************************************
  var generatePassword = function() {  
    var masterKey = $('#masterKey').val();
    var website = $('#website').val();
    var set = [];
    if ($('#numbers').prop('checked')) {
      set = set.concat(numbers);
    }
    if ($('#letters').prop('checked')) {
      set = set.concat(letters);
    }
    if ($('#special').prop('checked')) {
      set = set.concat(specials);
    }
    var passwordField = $('#password');
    passwordField.val(generateHash(masterKey.toLowerCase() + website.toLowerCase(), set, $('#length').val()));
  }

  // ***************************************
  // Function that generates the login
  // ***************************************
  var maybeGenerateLogin = function () {
    if ($('#generateLogin').prop('checked')) {
      var masterKey = $('#masterKey').val();
      var website = $('#website').val();
      $('#login').val(generateHash(masterKey.toLowerCase() + website.toLowerCase() + 'login', defaultSet, 10));
      $('#loginForm').removeClass('hidden');
    }
  }

  // ***************************************
  // Function that generates the verification string
  // ***************************************
  var generateControl = function () {
    var masterKey = $('#masterKey').val();
    $('#control').text(generateHash(masterKey.toLowerCase(), defaultSet, 10));
    $('#controlContainer').removeClass('hidden');
  }

  // ***************************************
  // Click handler, generate the password, the login, and the verification string
  // ***************************************
  $('#btGenerate').click(function() {
    generatePassword();
    maybeGenerateLogin();
    var resultsPanel = $('#resultsPanel');
    if (resultsPanel.hasClass('hidden')) {
      resultsPanel.removeClass('hidden');
      resultsPanel.hide();
      resultsPanel.slideDown();
    }
    return false;
  });
  
  $('#masterKey').keyup(function() {
    generateControl();
  });
  
  $('#lengthLess').click(function() {
    var length = $('#length');
    var newVal = parseInt(length.val()) - 1;
    if (newVal > 1) {
      length.val(newVal);
    }
  });
  
  $('#lengthPlus').click(function() {
    var length = $('#length');
    var newVal = parseInt(length.val()) + 1;
    length.val(newVal);
  });
});

