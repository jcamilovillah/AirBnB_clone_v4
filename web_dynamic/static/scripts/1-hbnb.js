
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
});
