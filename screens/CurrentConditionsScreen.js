import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid, Button, TouchableOpacity, Alert, Modal, ScrollView, ImageBackground  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function CurrentConditionsScreen({navigation}) {
  const [data, setData] = useState({ 'feeds': [{ 'field1': 'Loading...', 'field2': '', 'field3': '' }] });
  const [pHModalVisible, setPHModalVisible] = useState(false);
  const [temperatureModalVisible, setTemperatureModalVisible] = useState(false);

  const showPHModal = () => {
    setPHModalVisible(true);
  };

  const showTemperatureModal = () => {
    setTemperatureModalVisible(true);
  };

  useEffect(() => { /*Se apelează de fiecare dată când componenta este randată. */
    getJsonData();
  }, []);

  const getJsonData = () => { /* Extrage datele din ThingSpeak */
    fetch('https://api.thingspeak.com/channels/2045749/feeds.json?api_key=2XT7G4ANOKG0OG2I&results=2', { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
      Alert.alert('Request sent successfully!', '', [{ text: 'OK', onPress: () => {} }]);
  };

  const getTemperatureWidth = () => { /*Calculeaza procentul de umplere al bării pentru temperatură */
    const temperature = parseFloat(firstFeed['field2']);
    const minTemperature = 15;
    const maxTemperature = 35;
    const range = maxTemperature - minTemperature;
    const normalizedTemperature = temperature - minTemperature;
    const widthPercentage = (normalizedTemperature / range) * 100;
    return `${widthPercentage}%`;
  };

  const getpHWidth = () => { /*Calculează procentul de umplere al bării pentru pH */
    const pH = parseFloat(firstFeed['field3']);
    const minimpH = 5;
    const maximpH = 9;
    const range = maximpH - minimpH;
    const normalizedpH = pH - minimpH;
    const widthPercentage = (normalizedpH / range) * 100;
    return `${widthPercentage}%`;
  };
  

  const getWaterLevel = () => { /*Calculează bazat pe valoarea din ThingSpeak care este nivelul adevarat al apei */
    const feeds = data.feeds;
    const firstFeed = feeds[0];
    let waterLevel;
    if (firstFeed['field1'] == 0) {
      waterLevel = 'empty';
    } else if (firstFeed['field1'] == 1) {
      waterLevel = 'low';
    } else if (firstFeed['field1'] == 2) {
      waterLevel = 'medium';
    } else if (firstFeed['field1'] == 3) {
      waterLevel = 'high';
    }
    return waterLevel;
  };

  const getWaterLevelWidth = () => { /*Calculează procentul de umplere al bării pentru nivelul apei */
    let width = 0;
    switch (waterLevel) {
      case 'empty':
        width = 0;
        break;
      case 'low':
        width = '25%';
        break;
      case 'medium':
        width = '50%';
        break;
      case 'high':
        width = '100%';
        break;
      default:
        width = 0;
        break;
    }
    return width;
  };

  const feeds = data.feeds;
  const firstFeed = feeds[0];
  const waterLevel = getWaterLevel();

  let waterLevelText = '';
  if (waterLevel === 'empty' || waterLevel === 'low') {
    waterLevelText = 'Completează cu apă';
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.waterLevelContainer}>
          <Text style={styles.waterLevelText}>Nivelul Apei:  </Text>
            <View style={styles.waterLevelBar}>
              <View style={[styles.waterLevelFill, { width: getWaterLevelWidth() }]} />
            </View>
            {waterLevelText !== '' && (
              <Text style={styles.waterLevelText}>{waterLevelText}</Text>
            )}
        </View>
       <View style={styles.temperaturePhContainer}>
        <Text style={styles.temperatureLabel}>Temperatura: </Text>
        <View style={styles.temperatureScale}>
          <View style={[styles.temperatureFill, { width: getTemperatureWidth() }]} />
        </View>
        <Text style={styles.temperatureText}>{firstFeed['field2']}°C</Text>
      </View>
      <View style={styles.temperaturePhContainer}>
        <Text style={styles.temperatureLabel}>      pH:            </Text>
        <View style={styles.temperatureScale}>
          <View style={[styles.temperatureFill, { width: getpHWidth() }]} />
        </View>
        <Text style={styles.temperatureText}>{firstFeed['field3']}</Text>
      </View>
        <Button onPress={getJsonData} title="Preia datele" />
      </ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={showTemperatureModal} style={styles.icon}>
          <Ionicons name="md-help-circle" size={32} color="#386FBF" />
          <Text style={styles.iconText}>Temperatura</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showPHModal} style={styles.icon}>
          <Ionicons name="md-help-circle" size={32} color="#386FBF" />
          <Text style={styles.iconText}>pH</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={pHModalVisible} animationType="fade" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Pentru a ridica nivelul pH-ului din apă, introduceți bicarbonat. Pentru a scădea nivelul pH-ului, adăugați substanțe acide precum dioxid de carbon sau acizi organici.</Text>
            <TouchableOpacity onPress={() => setPHModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={temperatureModalVisible} animationType="fade" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>
              Temperatura apei poate fi influențată folosind termostatul atașat. Vă rog să introduceți termostatul în priză și să îl setați la temperatura recomandată în aplicație în ecranul "Acvariul Meu".
            </Text>
            <TouchableOpacity onPress={() => setTemperatureModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    paddingVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingVertical: 10,
  },
  icon: {
    alignItems: 'center',
  },
  iconText: {
    color: '#386FBF',
    marginTop: 5,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
  temperaturePhContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    fontSize: 16,
  },
  temperatureLabel: {
    marginLeft: 5,
  },
  temperatureScale: {
    flex: 1,
    height: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 20, 
  },
  temperatureFill: {
    height: '100%',
    backgroundColor: 'blue',
    position: 'relative',
  },
  temperatureText: {
    position: 'absolute',
    top: 0,
    right: -15, 
    color: 'blue',
    fontSize: 12,
    width: 40, 
    textAlign: 'center',
  },
  waterLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    fontSize: 16,
  },
  waterLevelText: {
    marginLeft: 5,
  },
  waterLevelBar: {
    width: 120,
    height: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  waterLevelFill: {
    height: '100%',
    backgroundColor: 'blue',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
});