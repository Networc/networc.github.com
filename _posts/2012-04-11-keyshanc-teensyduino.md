---
layout: post
title: Keyshanc Teensyduino
tags: keyshanc, teensyduino
description: A hardware device that encrypts keystrokes using Keyshanc.
keywords: keyshanc, keyboard encrypter, keyboard encryption, teensyduino
hashtag: keyshanc
---
###What does it do?
The Keyshanc Teensyduino is a device that encrypts keystrokes based on the [Keyshanc algorithm](http://andrewcreed.com/2012/04/04/keyshanc-overview.html). It has a PS/2 input and a USB output.

The device is intended to provide privacy from the keyboard\-to\-the\-application on compromised \(a.k.a. "monitored"\) and/or untrusted workstations.

###What software is required?
No software is required on the workstation. The only software requirement is that the receiving application \(or website\) must be Keyshanc\-enabled. In other words, the receiving application must allow the user to input a Keyshanc password \(preferrably via a graphical keyboard\) and then decrypt the keystrokes. I have an example console program available on [GitHub](https://github.com/Networc/keyshanc/blob/master/examples/consoleApp/main.cpp) and a webpage demo [here](http://andrewcreed.com/2012/04/16/keyshanc-ported-to-javascript.html).

<i>Note</i>: Software <b>is</b> required to initially program the Keyshanc Teensyduino, and is described below.

###Instructions
When first connected, the Keyshanc Teensyduino defaults to OFF \(i.e. keystrokes are not encrypted\). Use the function keys F1\-F11 to toggle between the 11 stored passwords. Press F12 to turn encryption OFF.

###Why 11 passwords?
Since the Keyshanc algorithm uses a simple substitution cipher, it is vulnerable to frequency analysis. The success rate of this method of attack should be lessened by allowing the user to switch between multiple passwords \(ciphers\).

Also, if a company wants to manufacture and sell Keyshanc Teensyduinos, then allowing the device to hold 11 passwords should give it a longer "useable lifespan" before it needs to be reprogrammed with new passwords.

That being said, there is no requirement for the user to switch passwords.

###Sample Output
The following output is the same text encrypted with the first two default passwords:
<pre><code>
[F1]  &TxJYUT$J1}JFKUT$J18xDJmqqJmT(JUTJ18xJ(mK/TxzzJFUT(J18xD
[F2]  7Ao!4KA'!&lt;E!zdKA'!&lt;Roa!P55!PA^!KA!&lt;Ro!^PdpAoVV!zKA^!&lt;Roa
[F12] One Ring to bring them all and in the darkness bind them</code></pre>
<br />
###Source Code
The Keyshanc Teensyduino source code is available on [GitHub](https://github.com/Networc/keyshanc-teensyduino). Please <b>Fork</b> this repo\!

###Parts Required
* [Teensy 2.0](http://pjrc.com/store/teensy_pins.html) with pins, $19
* [PS/2 Adapter](http://www.parallax.com/StoreSearchResults/tabid/768/txtSearch/ps/ProductID/513/Default.aspx), $5
* [Breadboard](http://www.allelectronics.com/make-a-store/item/PB-400/SOLDERLESS-BREADBOARD-400-CONTACTS/1.html), $4
* Jumper wires
<br />
###Assembly
As you can see from the pictures below, the Keyshanc Teensyduino requires minimal assembly. No soldering experience is required.

<img src="/images/keyshanc01.jpg" align="center" alt="Overhead View" /><br />
<br />
<img src="/images/keyshanc02.jpg" align="center" alt="Angle View" /><br />
<br />
1. Connect 5V \(PS/2 Adapter\) to Vcc \(Teensy 2.0\)
2. Connect GND \(PS/2 Adapter\) to GND \(Teensy 2.0\)
3. Connect DATA \(PS/2 Adapter\) to Pin 8 \(Teensy 2.0\)
4. Connect CLK \(PS/2 Adapter\) to Pin 5 \(Teensy 2.0\)
<br />
###Programming
1. Follow the steps at [PJRC.com](http://pjrc.com/teensy/td_download.html) to install the software for Arduino and Teensyduino.
2. Make sure to select the <b>PS2Keyboard</b> library on the "Libraries to Install" menu.
3. Change the special key codes in <b>PS2Keyboard.h</b> to the following:
	<pre><code>
	#define PS2_TAB         9
	#define PS2_ENTER       13
	#define PS2_BACKSPACE   1
	#define PS2_ESC         27
	#define PS2_INSERT      2
	#define PS2_DELETE      127
	#define PS2_HOME        3
	#define PS2_END         4
	#define PS2_PAGEUP      25
	#define PS2_PAGEDOWN    26
	#define PS2_UPARROW     11
	#define PS2_LEFTARROW   8
	#define PS2_DOWNARROW   10
	#define PS2_RIGHTARROW  21
	#define PS2_F1          5
	#define PS2_F2          6
	#define PS2_F3          7
	#define PS2_F4          12
	#define PS2_F5          14
	#define PS2_F6          15
	#define PS2_F7          16
	#define PS2_F8          17
	#define PS2_F9          18
	#define PS2_F10         19
	#define PS2_F11         20
	#define PS2_F12         22
	#define PS2_SCROLL      0</code></pre>

4. Make the following selections in the Arduino IDE:
    * Tools > Board > Teensy 2.0
    * Tools > USB Type > Keyboard \+ Mouse \+ Joystick
    * CPU Speed > 16 MHz
5. Load <b>keyshanc.ino</b>.
6. Click the <b>Verify</b> \(Check\) button.
7. Press the Teensy pushbutton when prompted by Teensy Loader. You're done\!
<br />
###User\-Defined Passwords
In order to create your own Keyshanc passwords, download and compile the [Keyshanc Generator](https://github.com/Networc/keyshanc-teensyduino/blob/master/keyshancGenerator.cpp). When run from a terminal, the Keyshanc Generator will prompt the user for 11 passwords and will then output the C\+\+ code for the 11 associated arrays. This output should then be copied and pasted into <b>keyshanc.ino</b>, overwriting the 11 default arrays.

The Keyshanc Generator has the following dependencies:

* <b>keyshanc.h</b> and <b>keyshanc.cpp</b>, both available on [GitHub](https://github.com/Networc/keyshanc)
* <b>Crypto++</b>, available from [cryptopp.com](http://www.cryptopp.com/) \(this is actually a keyshanc.cpp dependency\)
<br />
###Default Passwords
The Keyshanc Teensyduino source code has the following default passwords:
    F1:  aragorn
    F2:  bilbo
    F3:  boromir
    F4:  frodo
    F5:  gandalf
    F6:  gimli
    F7:  gollum
    F8:  legolas
    F9:  meriadoc
    F10: peregrin
    F11: samwise
<br />
###Acknowledgments
I would like to thank Paul Stoffregen of [PJRC.com](http://pjrc.com) for offering the Teensy, which has made my efforts to bring Keyshanc to life actually possible.

I would also like to thank Adrian Crenshaw of [Irongeek.com](http://www.irongeek.com). The inspiration for the Keyshanc Teensyduino came from  reading about his [Homemade Hardware Keylogger](http://www.irongeek.com/i.php?page=security/homemade-hardware-keylogger-phukd).

