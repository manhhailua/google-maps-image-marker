function ImageMarker(latlng, map, imageSrc, customClass) {
    this.latlng_ = latlng;
    this.imageSrc = imageSrc; // Added imageSrc
    this.customClass = customClass;
    this.setMap(map);
}

ImageMarker.prototype = new google.maps.OverlayView();

ImageMarker.prototype.draw = function draw() {
    'use strict';

    // Check if the div has been created.
    let div = this.div_;
    if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('div');
        // Create the DIV representing our CustomMarker
        div.className = 'image-marker '.concat(this.customClass); // Replaced styles with className

        const img = document.createElement('img');
        img.src = this.imageSrc; // Attach passed image uri
        div.appendChild(img);

        // google.maps.event.addDomListener(div, "click", function (event) {
        //    google.maps.event.trigger(me, "click");
        // });

        // Then add the overlay to the DOM
        const panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    // Position the overlay
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
        div.style.left = String(point.x).concat('px');
        div.style.top = String(point.y).concat('px');
    }
};

ImageMarker.prototype.remove = function remove() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

ImageMarker.prototype.getPosition = function getPosition() {
    return this.latlng_;
};
