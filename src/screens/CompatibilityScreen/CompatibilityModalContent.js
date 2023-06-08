import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const CompatibilityModalContent = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.modalView}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Length"
          />
        )}
        name="Length"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Width"
          />
        )}
        name="Width"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Height"
          />
        )}
        name="Height"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default CompatibilityModalContent;
