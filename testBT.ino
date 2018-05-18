#include <SoftwareSerial.h>
#define RX_PIN 5 // connect this pin to HC-05's TX
#define TX_PIN 6 // connect this pin to HC-05's RX

SoftwareSerial bt(RX_PIN, TX_PIN);
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.setTimeout(0.1);
  bt.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  String s;
  char buf [12];
  
  if(bt.available()) {
     const uint8_t num = bt.readBytesUntil('\n', buf, 12);
     char txt [num+1];
     for(uint8_t i = 0; i < num; i++) 
       txt[i] = buf[i];
     txt[num] = '\0';
     s = String(txt);
  }
  if(s.length()) Serial.println(s);

}
