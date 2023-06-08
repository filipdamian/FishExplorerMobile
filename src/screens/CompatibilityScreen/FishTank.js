import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, TextInput, Button, TouchableWithoutFeedback, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import config from '../../../config';
import authFetch from '../../helpers/authFetch';
import CompatibilityModalContent from './CompatibilityModalContent';

const FishTank = ({ tankId, onDeleteFishTank }) => {
  const [fishName, setFishName] = useState('');
  const [isAddingFish, setIsAddingFish] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tankInfo, setTankInfo] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const handleDeleteFishTank = async (tankId) => {
    try {
      await authFetch(`${config.API_BASE_URL}/api/Account/delete-tank`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'TankId': tankId,
        },
      });

      onDeleteFishTank();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddFish = () => {
    setIsAddingFish(true);
  };

  const handleSubmitFish = async (toDelete) => {
    if (!fishName) {
      // Fish name is required
      return;
    }

    try {
      const requestBody = {
        tankId,
        fishName,
        isDeleted: toDelete,
      };

      const response = await authFetch(`${config.API_BASE_URL}/api/Account/add-or-remove-fish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Handle the response as needed
      const responseData = await response.json();
      console.log(responseData);

      // Reset the fish name and close the modal
      setFishName('');
      setIsAddingFish(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditTank = async () => {
    setModalVisible(true);
  };

  const handleSubmitTank = async (values) => {

    console.log(values)
    if (!values.Length || !values.Width || !values.Height) {
      // Tank dimensions are required
      return;
    }
    try {

      const requestBody = {
        model: {
          length: values.Length,
          width: values.Width,
          height: values.Height,
          tankId,
        },
      };

      const response = await authFetch(`${config.API_BASE_URL}/api/Account/create-edit-tank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Handle the response as needed
      const responseData = await response.json();
      console.log(responseData);

      // Reset the dimensions and close the modal
      setLength('');
      setWidth('');
      setHeight('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInfoFetch = async () => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/api/Account/one-or-all-tanks?TankId=${tankId}`);
      const data = await response.json();
      setTankInfo(data);
      setInfoModalVisible(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setFishName('');
    setIsAddingFish(false);
    setModalVisible(false);
    setInfoModalVisible(false);
  };

  return (
    <View style={styles.fishTank}>
      <View style={styles.fishTankTop}>
        <TouchableOpacity onPress={() => handleDeleteFishTank(tankId)}>
          <Feather name="trash-2" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditTank(tankId)}>
          <Feather name="edit" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddFish}>
          <Feather name="plus-circle" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInfoFetch}>
          <Feather name="info" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.fishTankBody} />
      {isAddingFish && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddingFish}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => { }}>
                <View style={styles.modalContent}>
                  <TextInput
                    placeholder="Enter fish name"
                    value={fishName}
                    onChangeText={setFishName}
                    style={styles.input}
                  />
                  <Button title="Add Fish" onPress={() => handleSubmitFish(false)} />
                  <Button title="Remove Fish" onPress={() => handleSubmitFish(true)} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => { }}>
                <CompatibilityModalContent onSubmit={handleSubmitTank} onCancel={closeModal} />
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {infoModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={infoModalVisible}
          onRequestClose={() => setInfoModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setInfoModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  {tankInfo?.tankModels[tankId]?.map((fish, index) => <Text key={index}>{fish}</Text>)}
                  <Button title="Close" onPress={() => setInfoModalVisible(false)} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fishTank: {
    width: 200,
    height: 160,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 10,
  },
  fishTankTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
  },
  icon: {
    marginLeft: 10,
  },
  fishTankBody: {
    flex: 1,
    backgroundColor: 'lightblue',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FishTank;
