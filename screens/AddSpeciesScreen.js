import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Button, AppState } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function AddSpeciesScreen({ navigation }) {
  const route = useRoute();
  const { imageIds } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [arr, setArr] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  const openModal = (image) => {
    closeModal(); 
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  
  const images = [ /*Vectorul de imagini cu speciile de pești */
    { id: 1, source: require('../assets/neon.jpg'), title: 'Neon Tetra', description: ' Temperatura minimă: 20 \nTemperatura maximă: 26\n pH minim: 6.0 \npH maxim: 7.0' },
    { id: 2, source: require('../assets/betta.jpg'), title: 'Betta', description: 'Temperatura minimă: 26 \nTemperatura maximă: 29 \n pH minim: 6.5 \npH maxim: 7.5' },
    { id: 3, source: require('../assets/guppy.jpg'), title: 'Guppy', description: 'Temperatura minimă: 19 \nTemperatura maximă: 29 \n pH minim: 7.0 \npH maxim: 8.0' },
    { id: 4, source: require('../assets/molly.jpg'), title: 'Molly', description: 'Temperatura minimă: 24 \nTemperatura maximă: 26.7 \n pH minim: 7.5 \npH maxim: 8.5' },
    { id: 5, source: require('../assets/plat.jpg'), title: 'Platy', description: 'Temperatura minimă: 18 \nTemperatura maximă: 27 \n pH minim: 7.0 \npH maxim: 8.0' },
    { id: 6, source: require('../assets/sanitar.jpg'), title: 'Sanitar', description: 'Temperatura minimă: 19 \nTemperatura maximă: 23 \n pH minim: 6.5 \npH maxim: 7.5' },
    { id: 7, source: require('../assets/Swordtail.jpg'), title: 'Swordtail', description: 'Temperatura minimă: 17 \nTemperatura maximă: 27 \n pH minim: 7.0 \npH maxim: 8.0' },
    { id: 8, source: require('../assets/aspidoras-pauciradiatus.jpg'), title: 'Aspidoras-Pauciradiatus', description: 'Temperatura minimă: 21 \nTemperatura maximă: 26\n pH minim: 6.0 \npH maxim: 7.2' },
    { id: 9, source: require('../assets/zebra.jpg'), title: 'Zebra', description: 'Temperatura minimă: 16 \nTemperatura maximă: 28 \n pH minim: 6.0 \npH maxim: 7.0' },
    { id: 10, source: require('../assets/cichlid.jpg'), title: 'Cichlid', description: 'Temperatura minimă: 22 \nTemperatura maximă: 28 \n pH minim: 7.5 \npH maxim: 8.5' },
    { id: 11, source: require('../assets/gourami.jpg'), title: 'Gourami', description: 'Temperatura minimă: 22 \nTemperatura maximă: 28 \n pH minim: 6.0 \npH maxim: 8.5' },
    { id: 12, source: require('../assets/oscar.jpg'), title: 'Oscar', description: 'Temperatura minimă: 22 \nTemperatura maximă: 25 \n pH minim: 6.5 \npH maxim: 7.5' },
    { id: 13, source: require('../assets/Xifo.jpg'), title: 'Xifo', description: 'Temperatura minimă: 18 \nTemperatura maximă: 26 \n pH minim: 7.5 \npH maxim: 8.0' },
    { id: 14, source: require('../assets/somn_sticla.jpg'), title: 'Somnul de sticla', description: 'Temperatura minimă: 24 \nTemperatura maximă: 26 \n pH minim: 6.5 \npH maxim: 7.5' },
    { id: 15, source: require('../assets/clovn.jpg'), title: 'Peștele clovn', description: 'Temperatura minimă: 22 \nTemperatura maximă: 26 \n pH minim: 6.5 \npH maxim: 7.5' },
    { id: 16, source: require('../assets/rechin_negru.jpg'), title: 'Rechin Negru', description: 'Temperatura minimă: 22 \nTemperatura maximă: 27 \n pH minim: 8.0 \npH maxim: 8.5' },
    { id: 17, source: require('../assets/regal_tang.jpg'), title: 'Regal-Tang', description: 'Temperatura minimă: 22 \nTemperatura maximă: 26 \n pH minim: 8.0 \npH maxim: 8.5' },
    { id: 18, source: require('../assets/peste_mandarina.jpg'), title: 'Peștele mandarina', description: 'Temperatura minimă: 22 \nTemperatura maximă: 25 \n pH minim: 8.0 \npH maxim: 8.5' },
    { id: 19, source: require('../assets/chirurg.jpg'), title: 'Peștele Chirurg', description: 'Temperatura minimă: 22 \nTemperatura maximă: 26 \n pH minim: 8.0 \npH maxim: 8.5' },
    { id: 20, source: require('../assets/caras_auriu.jpg'), title: 'Carasul Auriu', description: 'Temperatura minimă: 18 \nTemperatura maximă: 24 \n pH minim: 6.5 \npH maxim: 8.5' },
  ];

  useEffect(() => { /*Acest efect se întâmplă de fiecare dată când imageIds și arr se modifică  */
    const newFilteredImages = imageIds
      ? images.filter((image) => arr[image.id - 1] === 1)
      : [];
    setFilteredImages(newFilteredImages);
  }, [arr, imageIds]);
  
  useEffect(() => { /*Acest efect se întâmplă de fiecare dată când imageIds se modifică  */
    if (imageIds) {
      setArr((prevArr) => {
        const newArr = [...prevArr];
        newArr[imageIds - 1] = 1;
        return newArr;
      });
    }
  }, [imageIds]);

  const removeFromTank = async (id) => { /*Funcția responsabilă de ștergerea speciilor din acvariul meu */
    arr[id - 1] = 0;
    closeModal();
  
    const updatedImageIds = imageIds.filter((imageId) => imageId !== id);
    navigation.setParams({ imageIds: updatedImageIds });
  };

/*Se extrag valorile de temperatură din descrierile imaginilor, de unde rezultă un obiect cu propruetățile id, minTemperature și maxTemperature*/
  const temperatureValues = images.map((image) => {
    const description = image.description;
    const temperatureRegex = /Temperatura minimă: (\d+) \nTemperatura maximă: (\d+)/;
    const [, minTemperature, maxTemperature] = description.match(temperatureRegex);
    
    return {
      id: image.id,
      minTemperature: parseInt(minTemperature),
      maxTemperature: parseInt(maxTemperature),
    };
  });

  /*Se iterează prin obiectele generate de funcția temperatureValues si calculează range-ul de temperatură astfel încât speciile să conviețuiască împreună*/
  function calculateTemperatureRange(arr, temperatureValues) {  
    let commonMinTemperature = 0;
    let commonMaxTemperature = 50;
  
    temperatureValues.forEach((temp) => {
      const { id, minTemperature, maxTemperature } = temp;
  
      if (arr[id - 1] === 1) {
        commonMinTemperature = Math.max(commonMinTemperature, minTemperature);
        commonMaxTemperature = Math.min(commonMaxTemperature, maxTemperature);
      }
    });
  
      const commonTemperatureRange = (commonMinTemperature < commonMaxTemperature && commonMinTemperature !== 0 && commonMaxTemperature !== 50)
    ? `Ajustați temperatura apei la un minim de ${commonMinTemperature}°C sau un maxim de ${commonMaxTemperature}°C\n`
    : (commonMinTemperature === commonMaxTemperature)
      ? `Ajustați temperatura apei la ${commonMinTemperature}°C\n`
      : (commonMinTemperature !== 0 && commonMaxTemperature !== 50)
        ? 'Speciile selectate nu pot conviețui împreună din cauză că nu există un interval de temperatură al apei potrivit.\n'
        : '';
    return commonTemperatureRange;
  }

  /*Se extrag valorile de pH din descrierile imaginilor, de unde rezultă un obiect cu propruetățile id, minpH și maxpH*/
  const pHValues = images.map((image) => {
    const { id, description } = image;
    const matches = description.match(/pH minim: (\d+\.\d+) \npH maxim: (\d+\.\d+)/);
    const minPH = parseFloat(matches[1]);
    const maxPH = parseFloat(matches[2]);
    return { id, minPH, maxPH };
  });

  /*Se iterează prin obiectele generate de funcția pHValues si calculează range-ul de pH astfel încât speciile să conviețuiască împreună*/
  function calculatePHRange(arr, images) {
    let commonMinPH = 5;
    let commonMaxPH = 9;
  
    pHValues.forEach((pH) => {
      const { id, minPH, maxPH } = pH;
  
      if (arr[id - 1] === 1) {
        commonMinPH = Math.max(commonMinPH, minPH);
        commonMaxPH = Math.min(commonMaxPH, maxPH);
      }
    });
  
    const commonPHRange = (commonMinPH < commonMaxPH && commonMinPH !== 5 && commonMaxPH !== 9)
  ? `Ajustați pH-ul apei la un minim de ${commonMinPH} sau un maxim de ${commonMaxPH}`
  : (commonMinPH === commonMaxPH)
    ? `Ajustați pH-ul apei la ${commonMinPH}`
    : (commonMinPH !== 5 && commonMaxPH !== 9)
      ? 'Speciile selectate nu pot conviețui împreună din cauză că nu există un interval de pH al apei potrivit.'
      : '';
    return commonPHRange;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
    {filteredImages.length === 0 && <Text style = {styles.noSpeciesText}>Nu ai adaugat nicio specie de pesti in acvariul tau. Te rog sa o faci din pagina Home</Text>}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {filteredImages.map((image) => (
          <TouchableOpacity key={image.id} onPress={() => openModal(image)}>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={image.source} />
              <Text style={styles.imageText}>{image.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedImage && (
        <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => closeModal()}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>{selectedImage.description}</Text>
              <Button title="Închide" onPress={() => closeModal()} />
              <Button title="Scoate din acvariul meu" onPress={() => removeFromTank(selectedImage.id)} />
            </View>
          </View>
        </Modal>
      )}
     <Text style={styles.bottomText}>{calculateTemperatureRange(arr, temperatureValues)} {calculatePHRange(arr, images)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingBottom: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 200,
  },
  imageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
  noSpeciesText: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: '50%'
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  
});

