const $ = window.$;
$(document).ready(function () {
  let listCheck = [];
  $('input:checkbox').css('margin-left', '10px');
  $('input:checkbox').on('click', function () {
    listCheck = [];
    $('input:checked').each(function () {
      listCheck.push($(this).attr('data-name'));
    });
    console.log(listCheck);
    $(this).parents('.amenities').find('h4').text(listCheck);
  });
  // localhost instead of 0.0.0.0 to work on windows
  $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
