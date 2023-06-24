#include "ThingSpeak.h"
#include "ESP8266WiFi.h"
#include <Servo.h>
#include "time.h"
#include <NTPClient.h>
#include <WiFiUdp.h>

#define RXp2 16
#define TXp2 17

/*THINGSPEAK---------------------------------------------------------------------*/
const unsigned int MAX_MESSAGE_LENGTH = 12;
const char * apiKey = "ZUK1QWVF9EQVC4SW";
const char * readApi = "2XT7G4ANOKG0OG2I";
unsigned long Channel_ID = 2045749;
const char* server = "api.thingspeak.com";
const int Field_Number_1 = 1;
const int Field_Number_2 = 2;
const int Field_Number_3 = 3;
const int Field_Number_4 = 4;
const int Field_Number_5 = 5;
int value[3]={0, 0, 0}; // valorile trimise în ThingSpeak
int i, cnt=0;

int hourFeed = 0;
int minuteFeed = 0;

/*THINGSPEAK---------------------------------------------------------------------*/

/*WI-FI--------------------------------------------------------------------------*/
//const char* ssid = "gjbh";
//const char* password = "camerabetivilor";
const char* ssid = "brisu"; 
const char* password = "brisubrisu"; 
//const char* ssid = "Razvan"; 
//const char* password = "vasile1972"; 
WiFiClient client;
/*WI-FI--------------------------------------------------------------------------*/

/*TIMP SI DATA CURENTE--------------------------------------------------------------*/
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
 int setHourFeedTime=15;
 int setMinuteFeedTime = 57;
 int ok=1;
/*TIMP SI DATA CURENTE--------------------------------------------------------------*/

 Servo s1;                            /*Inițiere servo*/

 void setup() {
  Serial.begin(115200);               /*Porneșste comunicarea serial*/
  timeClient.begin();                 /*Inițializarea clientului de timp*/
  timeClient.setTimeOffset(3 * 3600); /*Setarea timezone-ului pentru România*/
  s1.attach(0);                       /*Inițializarea servomotorului*/
  s1.write(0);                        /*Setarea servomotorului la poziția 0*/
  while (!Serial) {
    ;                                 /*Nu se întâmplă nimic dacă nu există comunicație serială*/
  }
  WiFi.mode(WIFI_STA);                /*Wi-fi setup*/
  WiFi.begin(ssid, password);         /*Conectare la SSID si parolă*/
  while (WiFi.status() != WL_CONNECTED) 
  {
     delay(500);
     Serial.print("*");               /*Se așteaptă conexiunea la WI-FI * */
  }
  Serial.println("");
  Serial.println("WiFi connection Successful");
  Serial.print("The IP Address of ESP8266 Module is: ");
  Serial.print(WiFi.localIP());
  Serial.println("");
  ThingSpeak.begin(client);           /*Inițializarea clientului ThingSpeak */

}
void loop() {
  timeClient.update();                /*Pornește clientul de timp*/
  for(i=0;i<=2;i++)                   /*Se trece prin acest for de 3 ori pentru că primesc 3 date din arduino*/
  {
    while (Serial.available() > 0)
    {
      static char message[MAX_MESSAGE_LENGTH];
      static unsigned int message_pos = 0;
      char inByte = Serial.read();
      if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) ) /*Se crează mesajul primit de la Arduino, caracter cu caracter*/
      {
        message[message_pos] = inByte;
        message_pos++;                
      }
      else
      {
        message[message_pos] = '\0';
        value[cnt]=atoi(message);               /*Conversie din ASCII la int*/
        cnt++;
        message_pos = 0;
      }
    }
  }
    if (Serial.available()) {
  }


  ThingSpeak.setField(1, value[0]);             /*Pregatim câmpurile din ThingSpeak pentru a fi scrise*/
  Serial.println(value[0]);
  ThingSpeak.setField(2, value[1]);
  Serial.println(value[1]);
  ThingSpeak.setField(3, value[2]);
  Serial.println(value[2]);

  ThingSpeak.writeFields(Channel_ID, apiKey);   /*Scriem câmpurile*/
  cnt=0;

  // Citim valorile din câmpurile 4 si 5 pentru ca acolo se află ora si minutul pentru feeding
  hourFeed = ThingSpeak.readIntField(Channel_ID, Field_Number_4, readApi);
  minuteFeed = ThingSpeak.readIntField(Channel_ID, Field_Number_5, readApi);
  Serial.println(hourFeed);
  Serial.println(minuteFeed);

  int currentHour = timeClient.getHours();    /*Ia ora și minutul curent*/
  int currentMinute = timeClient.getMinutes();
  Serial.print("Ora: ");
  Serial.print(currentHour);  
  Serial.print(" ");
  Serial.println(currentMinute);

  if(currentHour == hourFeed && currentMinute == minuteFeed && ok == 1) /*Setează servomotorul sa pornească doar atunci când a setat utilizatorul*/
  {
    ok=0;
    for(int i=0;i<=180;i+=10)
    {
      s1.write(i);
      delay(10);      
    }
    delay(500);
    for(int i=180;i>=0;i-=10)
    {
      s1.write(i);
      delay(10);
    }
  }
  else if(currentHour == hourFeed && currentMinute != minuteFeed)
  {
    ok=1;
  }
    
  delay(15000);
}
