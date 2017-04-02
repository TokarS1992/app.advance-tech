import { Component, ElementRef } from '@angular/core';

declare var google:any;

@Component({
    selector: 'google-map',
    template: '<div id="map"></div>',
    host: {
        '(document:scroll)': 'scrollToMap()'
    }
})

export class MapComponent {

    marker:any;
    markerCheck:boolean = true;
    place:Object = {
        lat: 48.409394,
        lng: 35.085288
    }
    map:any;

    constructor(private el: ElementRef) {}

    ngOnInit() {

        let mapRender =  new google.maps.DirectionsRenderer;
        this.map = new google.maps.Map(
            this.el.nativeElement.querySelector("#map"),
            { 
                center: this.place, 
                scrollwheel: false, 
                zoom: 16 ,
                styles:[ 
                    { 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                                "color": "#1d2c4d" 
                            } 
                        ] 
                    }, 
                    { 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                                "color": "#8ec3b9" 
                            } 
                        ] 
                    }, 
                    { 
                        "elementType": "labels.text.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#1a3646" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "administrative.country", 
                        "elementType": "geometry.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#4b6878" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "administrative.land_parcel", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                                "color": "#64779e" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "administrative.province", 
                        "elementType": "geometry.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#4b6878" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "landscape.man_made", 
                        "elementType": "geometry.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#334e87" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "landscape.natural", 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                                "color": "#023e58" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "poi", 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                                "color": "#283d6a" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "poi", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                            "color": "#6f9ba5" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "poi", 
                        "elementType": "labels.text.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#1d2c4d" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "poi.park", 
                        "elementType": "geometry.fill", 
                        "stylers": [ 
                            { 
                                "color": "#023e58" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "poi.park", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                                "color": "#3C7680" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road", 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                                "color": "#304a7d" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                            "color": "#98a5be" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road", 
                        "elementType": "labels.text.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#1d2c4d" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road.highway", 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                                "color": "#2c6675" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road.highway", 
                        "elementType": "geometry.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#255763" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road.highway", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                                "color": "#b0d5ce" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "road.highway", 
                        "elementType": "labels.text.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#023e58" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "transit", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                                "color": "#98a5be" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "transit", 
                        "elementType": "labels.text.stroke", 
                        "stylers": [ 
                            { 
                                "color": "#1d2c4d" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "transit.line", 
                        "elementType": "geometry.fill", 
                        "stylers": [ 
                            { 
                                "color": "#283d6a" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "transit.station", 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                            "color": "#3a4762" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "water", 
                        "stylers": [ 
                            { 
                                "color": "#ba5edd" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "water", 
                        "elementType": "geometry", 
                        "stylers": [ 
                            { 
                                "color": "#0e1626" 
                            } 
                        ] 
                    }, 
                    { 
                        "featureType": "water", 
                        "elementType": "labels.text.fill", 
                        "stylers": [ 
                            { 
                            "color": "#4e6d70" 
                            } 
                        ] 
                    } 
                ]
            }
        )

        mapRender.setMap(this.map);

    }

    scrollToMap() {
        let win = document.body.scrollTop;
        let winHeight = window.innerHeight;
        let marker:any;

        if ( win > winHeight ) {
            if (this.markerCheck) {
                this.marker = new google.maps.Marker({
                    position: this.place,
                    map: this.map,
                    title: 'Our place',
                    animation: google.maps.Animation.DROP
                });

                marker = this.marker;

                marker.addListener("click",function(){
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                });

                this.markerCheck = false;
            }
        } else if( win <= winHeight/2 ) {
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.markerCheck = true;
        }
    }

}