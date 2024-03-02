import React, { useState, useEffect, useRef } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const MapPage = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 19.0728,
    longitude: 72.8826,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [locations, setLocations] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:8080/locations/getAll");
      const data = await response.json();
      console.log("Fetched Locations:", data);
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSelect = async (address) => {
    try {
      const apiKey = 'YOUR_GOOGLE_API_KEY';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        setSearchAddress(address);
      } else {
        Alert.alert('Location not found', 'Please enter a valid address.');
      }
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });

      setCurrentLocation({ latitude, longitude });

      const apiKey = 'YOUR_GOOGLE_API_KEY';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        setSearchAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={mapRegion}
        onRegionChangeComplete={(region) => setMapRegion(region)}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.locationname}
          />
        ))}

        {currentLocation && (
          <Circle
            center={currentLocation}
            radius={20} // Adjust the radius as needed
            fillColor='#4285F4' // Blue color
            strokeColor='#4285F4'
            strokeWidth={1}
          />
        )}
      </MapView>
      <View style={{ position: 'absolute', top: 10, left: '50%', transform: [{ translateX: -50 }], zIndex: 1 }}>
        <TextInput
          value={searchAddress}
          onChangeText={(address) => setSearchAddress(address)}
          placeholder='Search for a location'
          style={{ margin: 10, padding: 5, width: 300, backgroundColor: '#fff' }}
          ref={searchInputRef}
        />
        <Button
          title='Search'
          onPress={() => handleSelect(searchAddress)}
        />
      </View>
      <Button
        onPress={getCurrentLocation}
        title='Get Current Location'
        style={{ position: 'absolute', top: 60, left: '50%', transform: [{ translateX: -50 }] }}
      />
    </View>
  );
};

export default MapPage;
