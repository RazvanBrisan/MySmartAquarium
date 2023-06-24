#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <SoftwareSerial.h>

char c=' ';

//SENZOR PH
float calibration_value = 29.30;
int phval = 0; 
unsigned long int avgval; 
int buffer_arr[10], temp;
int pHpin = A1;

//SENZOR TEMPERATURA
const int SENSOR_PIN = 4;
OneWire oneWire(SENSOR_PIN);         
DallasTemperature tempSensor(&oneWire); 
float tempCelsius;    
float tempFahrenheit; 

//SENZOR NIVEL APA
#define sensorPin A0
int lowerThreshold = 420;
int upperThreshold = 520;
int val = 0; //valoarea citita de catre senzorul de nivel al apei

void setup() {
  
  Serial.begin(115200);
  tempSensor.begin();
}

void loop() {
/* SENZOR NIVEL APA-----------------------------------------------------------*/
  val = analogRead(sensorPin);
  if (val <10) 
  {
    Serial.print(0);
    Serial.print('\n');
  }
  else if (val > 10 && val <= lowerThreshold) 
  {
    Serial.print(1);
    Serial.print('\n');
  }
  else if (val > lowerThreshold && val <= upperThreshold) 
  {
    Serial.print(2);
    Serial.print('\n');
  }
  else if (val > upperThreshold) 
  {
    Serial.print(3);
    Serial.print('\n');
  }
/* SENZOR NIVEL APA-----------------------------------------------------------*/


/*SENZOR TEMPERATURA------------------------------------------------------------*/
  tempSensor.requestTemperatures();             
  tempCelsius = tempSensor.getTempCByIndex(0);  
  tempFahrenheit = tempCelsius * 9 / 5 + 32; 

  Serial.print(tempCelsius);    
  Serial.print('\n');
/*SENZOR TEMPERATURA------------------------------------------------------------*/


/*SENZOR PH---------------------------------------------------------------------*/
  for(int i=0;i<10;i++) 
  { 
    buffer_arr[i]=analogRead(pHpin);
    delay(30);
  }
  for(int i=0;i<9;i++)
  {
    for(int j=i+1;j<10;j++)
    {
      if(buffer_arr[i]>buffer_arr[j])
      {
        temp=buffer_arr[i];
        buffer_arr[i]=buffer_arr[j];
        buffer_arr[j]=temp;
      }
    }
  }
  avgval=0;
  for(int i=2;i<8;i++)
  avgval+=buffer_arr[i];
  float voltage=(float)avgval*5.0/1024/6;
  float ph_act = -5.70 * voltage + calibration_value;
  Serial.print(ph_act);
  Serial.print('\n');
/*PSENZOR PH---------------------------------------------------------------------*/
  
  delay(14700); // delay pentru a nu pierde date in momentul trimiterii catre ThingSpeak
}