void setup() {

//  digitalWrite(A0, HIGH);  // make A0 a voltage supply for the accelerometer
//
//  digitalWrite(A2, LOW);   // make A2 ground for the accelerometer

  Serial.begin(9600);

}


void loop() {

  
  int yAxis = analogRead(A1);  // Yout pin of accelerometer
  
  int mapY = map(yAxis, 322, 341, 0, 2);

  Serial.write(mapY);

  delay(50);
   
}
