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
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 200) {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
