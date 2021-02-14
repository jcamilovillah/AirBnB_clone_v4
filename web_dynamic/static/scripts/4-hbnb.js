const $ = window.$;
$(document).ready(function () {
  let listCheck = [];
  $('input:checkbox').css('margin-left', '10px');
  $('input:checkbox').on('click', function () {
    listCheck = [];
    $('input:checked').each(function () {
      // listCheck.push(' ' + $(this).attr('data-name'));
      listCheck.push(
          {
            id: $(this).attr('data-id'), 
            name: $(this).attr('data-name')
          }
        )
    });
    $(this).parents('.amenities').find('h4').text(
        listCheck.map(function(amenity){ 
          return ' ' + amenity.name;
        })
      );
  });
  // localhost instead of 0.0.0.0 to work on windows
  $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  
  
  let queryPlaces = function(searchParam) {
    $.ajax({
      type: 'POST',
      // localhost instead of 0.0.0.0 to work on windows
      url: 'http://localhost:5001/api/v1/places_search/',
      data: searchParam,
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        $('SECTION.places').empty()
        // console.log(data.length); check the amout of data that is being filtered 
        for (const place of data) {
          const template = `<article>
                                 <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                 </div>
                                 <div class="information">
                                    <div class="max_guest">${place.max_guest} Guests</div>
                                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                 </div>
                                 <div class="description">${place.description}</div>
                              </article>`;
          $('SECTION.places').append(template); // Here, appends to the class
        }
      }
    });
  }
  queryPlaces('{}');
  
  $('button').click(
    function(){
      const filter = {amenities: []};

      filter.amenities = listCheck.map(
        function(amenity){
          return amenity.id
        });
      queryPlaces(JSON.stringify(filter));
    }
  );
});
