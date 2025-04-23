let map;
let geocoder;

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();
}

document.getElementById('address-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let fromAddress = document.getElementById('from').value;
    let toAddress = document.getElementById('to').value;

    
    geocodeAddress(fromAddress, 'From');
    geocodeAddress(toAddress, 'To');

    showPopup();
});

function showPopup() {
    const popup = document.getElementById('popup-container');
    popup.style.display = 'block';

    setTimeout(function () {
        popup.style.opacity = 1; 
    }, 10);
}

function geocodeAddress(address, label) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: label
            });

            let bounds = new google.maps.LatLngBounds();
            bounds.extend(results[0].geometry.location);
            map.fitBounds(bounds);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
