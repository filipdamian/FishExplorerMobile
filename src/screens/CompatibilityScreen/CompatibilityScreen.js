// CompatibilityScreen.js

import React from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import CompatibilityModalContent from './CompatibilityModalContent';
import FishTank from './FishTank';
import config from '../../../config';
import authFetch from '../../helpers/authFetch';

const CompatibilityScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fishTanks, setFishTanks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetchFishTanks();
  }, []);

  const fetchFishTanks = async () => {
    setIsLoading(true);
    try {
      const response = await authFetch(`${config.API_BASE_URL}/api/Account/one-or-all-tanks`);
      const data = await response.json();

      console.log(data.tankModels,"dataaa")

      setFishTanks(data.tankModels);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const onSubmit = async data => {
    const requestBody = {
      model: {
        length: data.Length,
        width: data.Width,
        height: data.Height,
      }
    };

    console.log(requestBody, "asdasdasd");
    try {
      const response = await authFetch(`${config.API_BASE_URL}/api/Account/create-edit-tank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      fetchFishTanks();
      console.log(responseData); // Log the response data for debugging
    } catch (error) {
      console.error('Error:', error);
    }

    // After submitting the data, reset the form to its default state
    reset({ Length: "", Width: "", Height: "" });

    // Close the modal
    setModalVisible(false);
    
    // Fetch fish tanks data again
    fetchFishTanks();
  };
  
  const renderFishTanks = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (!fishTanks || Object.keys(fishTanks).length === 0) {
      return <Text>No Fish Tanks Found</Text>;
    }
  
    return (
      <View style={styles.tankContainer}>
        {Object.entries(fishTanks).map(([tankId, fishList]) => (
          <FishTank key={tankId} tankId={tankId} onDeleteFishTank={fetchFishTanks} />
        ))}
      </View>
    );
  };
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Aquarium"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.separator} />
      <ScrollView>
        {renderFishTanks()}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              {/* Replace CompatibilityModalContent with your actual modal content component */}
              <CompatibilityModalContent onSubmit={onSubmit} />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  buttonContainer: {
    paddingHorizontal: 50,
    paddingBottom: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tankContainer: {
    width: '80%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CompatibilityScreen;