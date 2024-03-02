import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Button, Alert } from 'react-native';
import { DataTable, IconButton, Dialog, Portal, Paragraph, Button as PaperButton } from 'react-native-paper';
import AddLocationPopup from './locationform';
import { PencilOutline, TrashCanOutline } from '@expo/vector-icons';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [isAddLocationPopupOpen, setIsAddLocationPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const fetchLocations = () => {
    fetch("http://localhost:8080/locations/getAll")
      .then((res) => res.json())
      .then((result) => {
        // Reverse the order of the locations and set them in state
        setLocations([...result.reverse()]);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenAddLocationPopup = () => {
    setIsAddLocationPopupOpen(true);
  };

  const handleCloseAddLocationPopup = () => {
    setIsAddLocationPopupOpen(false);
    fetchLocations();
  };

  const handleEdit = (id) => {
    const selectedLocation = locations.find((location) => location.id === id);
    setSelectedLocation(selectedLocation);
    setIsAddLocationPopupOpen(true);
  };

  const handleDelete = (id) => {
    const selectedLocation = locations.find((location) => location.id === id);
    setSelectedLocation(selectedLocation);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:8080/locations/delete/${selectedLocation.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log(res); // Log the response from the server
        fetchLocations();
      })
      .catch((error) => {
        console.error('Error deleting location:', error);
      });

    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const renderItem = ({ item }) => (
    <DataTable.Row key={item.id}>
      <DataTable.Cell>{item.id}</DataTable.Cell>
      <DataTable.Cell>{item.locationName}</DataTable.Cell>
      <DataTable.Cell>{item.latitude}</DataTable.Cell>
      <DataTable.Cell>{item.longitude}</DataTable.Cell>
      <DataTable.Cell>{item.evCharging ? 'Yes' : 'No'}</DataTable.Cell>
      <DataTable.Cell>{item.security ? 'Yes' : 'No'}</DataTable.Cell>
      <DataTable.Cell>{item.cctv ? 'Yes' : 'No'}</DataTable.Cell>
      <DataTable.Cell>{item.confirmPayment ? 'Yes' : 'No'}</DataTable.Cell>
      <DataTable.Cell>
        <IconButton icon={() => <PencilOutline />} onPress={() => handleEdit(item.id)} />
      </DataTable.Cell>
      <DataTable.Cell>
        <IconButton icon={() => <TrashCanOutline />} onPress={() => handleDelete(item.id)} />
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <View style={{ backgroundColor: '#404040', padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Location</Text>
        <Button title="Add" onPress={handleOpenAddLocationPopup} />
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Location Name</DataTable.Title>
            <DataTable.Title>Latitude</DataTable.Title>
            <DataTable.Title>Longitude</DataTable.Title>
            <DataTable.Title>EV Charging</DataTable.Title>
            <DataTable.Title>Security</DataTable.Title>
            <DataTable.Title>CCTV</DataTable.Title>
            <DataTable.Title>Online Payment</DataTable.Title>
            <DataTable.Title>Edit</DataTable.Title>
            <DataTable.Title>Delete</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={locations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </DataTable>
      </View>

      <AddLocationPopup
        isOpen={isAddLocationPopupOpen}
        onClose={() => {
          setSelectedLocation(null);
          handleCloseAddLocationPopup();
        }}
        selectedLocation={selectedLocation}
      />

      <Portal>
        <Dialog visible={isDeleteConfirmationOpen} onDismiss={handleCancelDelete}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete the location?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={handleCancelDelete}>Cancel</PaperButton>
            <PaperButton onPress={handleConfirmDelete}>Confirm</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default LocationList;
