import React, { useState, useEffect } from 'react';
import { View, Button, CheckBox, TextInput, Alert } from 'react-native';
import { Dialog, DialogContent, DialogActions } from 'react-native-paper';

export default function AddLocationPopup({ isOpen, onClose, selectedLocation }) {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [evCharging, setEvCharging] = useState(false);
  const [security, setSecurity] = useState(false);
  const [cctv, setCCTV] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [locationNameError, setLocationNameError] = useState(null);
  const [latitudeError, setLatitudeError] = useState(null);
  const [longitudeError, setLongitudeError] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      setLocationName(selectedLocation.locationName || '');
      setLatitude(selectedLocation.latitude || '');
      setLongitude(selectedLocation.longitude || '');
      setEvCharging(selectedLocation.evCharging || false);
      setSecurity(selectedLocation.security || false);
      setCCTV(selectedLocation.cctv || false);
      setConfirmPayment(selectedLocation.confirmPayment || false);
    } else {
      resetForm();
    }
  }, [selectedLocation]);

  const resetForm = () => {
    setLocationName('');
    setLatitude('');
    setLongitude('');
    setEvCharging(false);
    setSecurity(false);
    setCCTV(false);
    setConfirmPayment(false);
    setLocationNameError(null);
    setLatitudeError(null);
    setLongitudeError(null);
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      console.error('Invalid input. Please check your input values.');
      return;
    }

    try {
      const apiUrl = selectedLocation
        ? `http://localhost:8080/locations/update/${selectedLocation.id}`
        : 'http://localhost:8080/locations/add';

      const response = await fetch(apiUrl, {
        method: selectedLocation ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationName,
          latitude,
          longitude,
          evCharging,
          security,
          cctv,
          confirmPayment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(selectedLocation ? 'Location updated successfully:' : 'Location added successfully:', data);
      } else {
        console.error(selectedLocation ? 'Error updating location:' : 'Error adding location:', response.statusText);
      }
    } catch (error) {
      console.error(selectedLocation ? 'Error updating location:' : 'Error adding location:', error);
    }

    onClose();
    resetForm();
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    onClose();
    resetForm();
  };

  const validateInputs = () => {
    let isValid = true;

    if (!/^[a-zA-Z\s]+$/.test(locationName)) {
      setLocationNameError('Please use only letters and spaces.');
      isValid = false;
    } else {
      setLocationNameError(null);
    }

    if (!/^-?\d+(\.\d+)?$/.test(latitude)) {
      setLatitudeError('Please enter a valid numeric value.');
      isValid = false;
    } else {
      setLatitudeError(null);
    }

    if (!/^-?\d+(\.\d+)?$/.test(longitude)) {
      setLongitudeError('Please enter a valid numeric value.');
      isValid = false;
    } else {
      setLongitudeError(null);
    }

    return isValid;
  };

  return (
    <Dialog visible={isOpen} onDismiss={() => {
      onClose();
      resetForm();
    }}>
      <DialogContent>
        <View>
          <TextInput
            label="Location Name"
            placeholder="Location Name"
            value={locationName}
            onChangeText={(text) => setLocationName(text)}
            error={locationNameError !== null}
            helperText={locationNameError}
          />

          <TextInput
            label="Latitude"
            placeholder="Latitude"
            value={latitude}
            onChangeText={(text) => setLatitude(text)}
            error={latitudeError !== null}
            helperText={latitudeError}
          />

          <TextInput
            label="Longitude"
            placeholder="Longitude"
            value={longitude}
            onChangeText={(text) => setLongitude(text)}
            error={longitudeError !== null}
            helperText={longitudeError}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CheckBox
              value={evCharging}
              onValueChange={() => setEvCharging(!evCharging)}
            />
            <Button onPress={() => setEvCharging(!evCharging)} title="EV Charging" />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CheckBox
              value={security}
              onValueChange={() => setSecurity(!security)}
            />
            <Button onPress={() => setSecurity(!security)} title="Security" />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CheckBox
              value={cctv}
              onValueChange={() => setCCTV(!cctv)}
            />
            <Button onPress={() => setCCTV(!cctv)} title="CCTV" />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CheckBox
              value={confirmPayment}
              onValueChange={() => setConfirmPayment(!confirmPayment)}
            />
            <Button onPress={() => setConfirmPayment(!confirmPayment)} title="Confirm Payment" />
          </View>
        </View>
      </DialogContent>
      <DialogActions>
        <Button onPress={handleSubmit}>Submit</Button>
        <Button onPress={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
