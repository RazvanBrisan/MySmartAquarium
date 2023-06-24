import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [  /*Vectorul de imagini cu speciile de pești */
    { id: 1, source: require('../assets/neon.jpg'), title: 'Neon Tetra', description: 'Tetrele de neon trebuie ținute în grupuri de cel puțin o jumătate de duzină, deoarece sunt o specie de banc. Cu dispoziții pașnice, pot fi ținute și cu alte specii de pești neagresivi.' },
    { id: 2, source: require('../assets/betta.jpg'), title: 'Betta', description: 'Peștii Betta sunt cei mai populari pești din magazinele de animale, recunoscuți pentru agilitatea, interactivitatea si costurile mici de întreținere. Ei pot fi "animale" de companie pe o durată foarte lungă de timp. \n\n' },
    { id: 3, source: require('../assets/guppy.jpg'), title: 'Guppy', description: 'Există multe soiuri de modele de culoare și coadă. În general, au nevoie de un raport de 1 mascul la 2 femele sau mai mult. Toți Guppies sunt pești rezistenți care tolerează niveluri și temperaturi mai scăzute de oxigen decât majoritatea peștilor de acvariu, dau naștere tinerilor vii și se înmulțesc ușor în rezervoarele de acasă. Poate trăi în plină apă de mare.' },
    { id: 4, source: require('../assets/molly.jpg'), title: 'Molly', description: 'Peștii Molly sunt poate cei mai dificili dintre peștii vivipari, deoarece sunt foarte delicați. Când sunt expuși la orice tip de stres ambiental, ei dezvoltă o boală cunoscută în mod obișnuit sub numele de „shimmies”. \n' },
    { id: 5, source: require('../assets/plat.jpg'), title: 'Platy', description: 'Este un peșste gregar (este bine să fie tinut in grupuri), foarte liniștit, chiar sperios. A se evita asocierea acestora cu pești mai agresivi, ca Barbus Tetrazona.' },
    { id: 6, source: require('../assets/sanitar.jpg'), title: 'Sanitar', description: 'Peștii sanitari sunt printre peștii preferați ai acvariștilor mai mult sau mai putin experimentați, deoarece sunt rezistenți, puțin pretențioși și compatibili cu majoritatea celorlalte specii de pești de apă dulce.\n' },
    { id: 7, source: require('../assets/Swordtail.jpg'), title: 'Swordtail', description: 'Este un pește deosebit de frumos, care în urma încrucișărilor prezintă o varietate foarte mare de forme și mai ales culori. Masculii sunt oarecum agresivi între ei. În acvariu se instaureaza o ierarhie precisă, masculul mai puternic devenind mascul dominant, acesta având prioritate la hrană si împerechere. \n' },
    { id: 8, source: require('../assets/aspidoras-pauciradiatus.jpg'), title: 'Aspidoras-Pauciradiatus', description: 'Este un pește timid ce poate fi deranjat de agitația unui acvariu comunitar însă poate fi ținut împreună cu pești mici din bazinul Amazonului. Se recomandă să fie ținut în grupuri de minimum șase indivizi însă daca spațiul permite, acestea pot fi mai mari. \n' },
    { id: 9, source: require('../assets/zebra.jpg'), title: 'Zebra', description: 'Este un peşte exotic de apă dulce. Cu o alură delicată şi energie debordantă, el este preferat mai ale de acvariştii începători. Numele său defineşte cea mai remarcabilă caracteristică a sa: corpul dungat. \n' },
    { id: 10, source: require('../assets/cichlid.jpg'), title: 'Cichlid', description: 'Acest pește se prezintă intr-o varietate foarte largă de culori, de la galben si brun deschis până la verde oliv si verde închis. Se întalnesc și exemplare cu striațiuni longitudinale (Royal Green) precum și exemplare cu puncte roșii pe lateral. ' },
    { id: 11, source: require('../assets/gourami.jpg'), title: 'Gourami', description: 'Gourami sunt o familie diversă de pești de dimensiuni medii sau mari. Majoritatea pot fi păstrați în acvarii comunitare, dar unele specii nu se împacă bine cu altele, iar altele sunt prea timide pentru a fi păstrate cu orice specie de pește. \n\n' },
    { id: 12, source: require('../assets/oscar.jpg'), title: 'Oscar', description: 'Peștele Oscar este o specie de pește care face parte din familia Ciclidelor și are denumirea științifică "Astronotus Ocellatus". Acești pești sunt răspândiți în America de Sud pe cursul mijlociu al Amazonului și al lui Rio Negro, iar în sud, în zona Panama până la Rio Paraguai.' },
    { id: 13, source: require('../assets/Xifo.jpg'), title: 'Xifo', description: 'Xiphophorus Helleri (Xifo, Xipho), peștele de acvariu cu coada în formă de spadă, face parte din familia Poeciliidae, ordinul Cyprinodontiforme și este nepretentios, extrem de adaptabil și rezistent. \n' },
    { id: 14, source: require('../assets/somn_sticla.jpg'), title: 'Somnul de sticlă', description: 'Somnul de sticlă (Kryptopterus bicirrhis) face parte din familia Siluridae și a fost identificat pentru prima oară in 1934. Este originar din sud- estul Asiei (Malayezia, Tailanda) ca toți peștii proveniți din aceste zone, somnul de sticlă necesită condiții tropicale pentru a ramane sănătoși.\n' },
    { id: 15, source: require('../assets/clovn.jpg'), title: 'Peștele clovn', description: 'Peștele Clovn are o culoare portocalie strălucitoare, cu trei dungi albe. Aceste dungi sunt adesea mărginite de culoare neagră. Dimensiunea lui este în medie de 9 cm și trăiește în grupuri la adăpostul oferit de anemone. Peștele Clovn poartă și numele de peștele anemonă, datorită relației speciale pe care o are cu această plantă. \n' },
    { id: 16, source: require('../assets/rechin_negru.jpg'), title: 'Rechin Negru', description: 'Rechinul negru (Labeo chrysophekadion) este un pește de acvariu care trăiește în sălbaticie in Malaezia și sud-estul Asiei. Este o specie foarte interesantă, energică si curioasă care prezintă o culoare negru atractivă.' },
    { id: 17, source: require('../assets/regal_tang.jpg'), title: 'Regal-Tang', description: 'Regal Tang Un peste foarte colorat, ce este desenat si in desenele animate. Este usor recunoscut dupa corpul blue deschis cu linia neagra ce duce pe toata lungimea corpului pana la coada.\n' },
    { id: 18, source: require('../assets/peste_mandarina.jpg'), title: 'Peștele mandarina', description: 'Peștele Mandarin este un membru mic, viu colorat, parte din familia Dragonet, popular în comerțul acvaristic de apă marină. Peștele mandarin este originar din Pacific, din Insulele Ryukyu, la sud de Australia.\n' },
    { id: 19, source: require('../assets/chirurg.jpg'), title: 'Peștele Chirurg', description: 'Peștele Chirurg este un pește de apă de mare din familia de Acanthuridae care trăiește în recifurile de corali din Pacific și Oceanul Indian. Este o specie foarte populară ca pește de acvariu.' },
    { id: 20, source: require('../assets/caras_auriu.jpg'), title: 'Carasul Auriu', description: 'Carasul Auriu este un pește dulcicol din familia ciprinide, originar din China, cultivat și în parte introdus în apele naturale din Europa, America de Nord, Australia etc. În România și Republica Moldova este crescut ca pește ornamental de amatori în bazine și acvarii. \n\n' },
];

  const openModal = (image) => {
    closeModal(); 
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addToMyTank = (image) => { /*Funcția responsabilă de adăugarea in acvariu a speciilor */
    const { id } = image;
    closeModal();
    navigation.navigate('Acvariul Meu', { imageIds: [id] });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
        Fish Species
      </Text>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image) => (
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
              <Button style = {styles.buttonClose} title="Închide" onPress={() => closeModal()}  />
              <Button title="Adaugă în acvariul meu" onPress={() => addToMyTank(selectedImage)} />
            </View>
          </View>
        </Modal>
      )}
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
  buttonClose: {
    marginBottom: 15,
  }
});
