var baseMapLayer = new ol.layer.Tile({
     source: new ol.source.OSM() 
    }); 
    
    var layer = new ol.layer.Tile({ 
        source: new ol.source.OSM() 
    });
var center = ol.proj.fromLonLat([32, 39]);
var view = new ol.View({ 
         center: center, 
         zoom: 10 }); 
var map = new ol.Map({ 
        target: 'map',
        view: view, 
        layers: [layer] 
}); 

var styles = [];

styles['cam'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/pine.png'
    })
});


styles['Kavak'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/poplar.png'
    })
});

styles['Akasya'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/akasya.png'
    })
});

styles['Kestane'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/chestnut.png'
    })
});

styles['Mese'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/oak.png'
    })
});

styles['Disbudak'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/ash.png'
    })
});

styles['cinar'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/plane.png'
    })
});

styles['Default'] = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.1,
        src: '/images/plane.png'
    })
});

var vectorSource = new ol.source.Vector({
    url: "/api/data",
    format: new ol.format.GeoJSON({ featureProjection: "EPSG:4326" })
});

var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: function (feature, resolution) {
        var type = feature.getProperties().tree_type;
        if (type == 'cam') {
            return styles['cam'];
        } else if (type == 'Kavak') {
            return styles['Kavak'];
        } else if (type == 'Akasya') {
            return styles['Akasya'];
        } else if (type == 'Kestane') {
            return styles['Kestane'];
        } else if (type == 'Mese') {
            return styles['Mese'];
        } else if (type == 'Disbudak') {
            return styles['Disbudak'];
        } else if (type == 'cinar') {
            return styles['cinar'];
        } else {
            return styles['Default'];
        }
    }         


});



map.addLayer(markerVectorLayer); 
var select = new ol.interaction.Select({multiple:false}); 
select.on('select', fnHandler); 
map.addInteraction(select);
map.on("click",handleMapClick); 
function handleMapClick(evt) { 
    var coord=ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    document.getElementById("Latitude").value=coord[1];
    document.getElementById("Longitude").value=coord[0];
}
function fnHandler(e) {
    var coord = e.mapBrowserEvent.coordinate; 
    let features = e.target.getFeatures(); 
    features.forEach( (feature) => { 
        console.log(feature.getProperties());
        document.getElementById("tree_type").value = feature.getProperties().tree_type;
        document.getElementById("age").value = feature.getProperties().tree_age;
        document.getElementById("length").value = feature.getProperties().tree_length;});
        if (e.selected[0]) { 
            var coords=ol.proj.transform(e.selected[0].getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
            document.getElementById("Latitude").value=coords[1]; 
            document.getElementById("Longitude").value=coords[0]; 
            console.log(coords); 
        } 
    } 
function submit() { 
    var xhr = new XMLHttpRequest(); xhr.open("POST", "/post", true);
    xhr.setRequestHeader('Content-Type', 'application/json'); 
    var data=JSON.stringify({ 
        Latitude: document.getElementById('Latitude').value, 
        Longitude: document.getElementById('Longitude').value, 
        tree_type: document.getElementById('tree_type').value,
        tree_length: document.getElementById('length').value,
        tree_age: document.getElementById('age').value
    }); 
    xhr.send(data); 
    location.reload(); 
}