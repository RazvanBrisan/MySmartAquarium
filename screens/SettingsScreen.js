import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const dataHours = [
  { key: '1', value: '01' },
  { key: '2', value: '02' },
  { key: '3', value: '03' },
  { key: '4', value: '04' },
  { key: '5', value: '05' },
  { key: '6', value: '06' },
  { key: '7', value: '07' },
  { key: '8', value: '08' },
  { key: '9', value: '09' },
  { key: '10', value: '10' },
  { key: '11', value: '11' },
  { key: '12', value: '12' },
  { key: '13', value: '13' },
  { key: '14', value: '14' },
  { key: '15', value: '15' },
  { key: '16', value: '16' },
  { key: '17', value: '17' },
  { key: '18', value: '18' },
  { key: '19', value: '19' },
  { key: '20', value: '20' },
  { key: '21', value: '21' },
  { key: '22', value: '22' },
  { key: '23', value: '23' },
  { key: '24', value: '24' },
];

const dataMinutes = [
  { key: '0', value: '00' },
  { key: '1', value: '01' },
  { key: '2', value: '02' },
  { key: '3', value: '03' },
  { key: '4', value: '04' },
  { key: '5', value: '05' },
  { key: '6', value: '06' },
  { key: '7', value: '07' },
  { key: '8', value: '08' },
  { key: '9', value: '09' },
  { key: '10', value: '10' },
  { key: '11', value: '11' },
  { key: '12', value: '12' },
  { key: '13', value: '13' },
  { key: '14', value: '14' },
  { key: '15', value: '15' },
  { key: '16', value: '16' },
  { key: '17', value: '17' },
  { key: '18', value: '18' },
  { key: '19', value: '19' },
  { key: '20', value: '20' },
  { key: '21', value: '21' },
  { key: '22', value: '22' },
  { key: '23', value: '23' },
  { key: '24', value: '24' },
  { key: '25', value: '25' },
  { key: '26', value: '26' },
  { key: '27', value: '27' },
  { key: '28', value: '28' },
  { key: '29', value: '29' },
  { key: '30', value: '30' },
  { key: '31', value: '31' },
  { key: '32', value: '32' },
  { key: '33', value: '33' },
  { key: '34', value: '34' },
  { key: '35', value: '35' },
  { key: '36', value: '36' },
  { key: '37', value: '37' },
  { key: '38', value: '38' },
  { key: '39', value: '39' },
  { key: '40', value: '40' },
  { key: '41', value: '41' },
  { key: '42', value: '42' },
  { key: '43', value: '43' },
  { key: '44', value: '44' },
  { key: '45', value: '45' },
  { key: '46', value: '46' },
  { key: '47', value: '47' },
  { key: '48', value: '48' },
  { key: '49', value: '49' },
  { key: '50', value: '50' },
  { key: '51', value: '51' },
  { key: '52', value: '52' },
  { key: '53', value: '53' },
  { key: '54', value: '54' },
  { key: '55', value: '55' },
  { key: '56', value: '56' },
  { key: '57', value: '57' },
  { key: '58', value: '58' },
  { key: '59', value: '59' }
];

export default function SettingsScreen({ navigation }) {
  const [selectedHour, setSelectedHour] = React.useState('');
  const [selectedMinute, setSelectedMinute] = React.useState('');

  const saveToThingSpeak = () => {  /*Salvează ora și minutul setat de către utilizator în ThingSpeak */
    if (selectedHour !== '' && selectedMinute !== '') {
      const fieldValueHour = selectedHour;
      const fieldValueMinute = selectedMinute;
      const channelURL =
        'https://api.thingspeak.com/update.json?api_key=ZUK1QWVF9EQVC4SW'; 

      fetch(`${channelURL}&field4=${fieldValueHour}&field5=${fieldValueMinute}`)
        .then((response) => response.json())
        .then(() => {
          console.log('Data saved to ThingSpeak:', fieldValueHour, fieldValueMinute);
        })
        .catch((error) => {
          console.error('Error saving data to ThingSpeak:', error);
        });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>Ajustează ora și minutul</Text>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>pentru feeding automat</Text>
      <View style={{ width: '80%', marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Setează ora:</Text>
        <SelectList data={dataHours} setSelected={setSelectedHour} placeholder="Ora" />
      </View>
      <View style={{ width: '80%', marginBottom: 30 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Setează minutul:</Text>
        <SelectList data={dataMinutes} setSelected={setSelectedMinute} placeholder="Minutul" />
      </View>
      <Button onPress={saveToThingSpeak} title="Salvează în ThingSpeak" />
    </View>
  );
}
