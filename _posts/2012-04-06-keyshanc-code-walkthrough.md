---
layout: post
title: Keyshanc Code Walkthrough
tags: keyshanc
description: A walkthrough of the KEYboard SHA-based eNCrypter algorithm.
keywords: keyshanc, keyboard encrypter, keyboard encryption
hashtag: keyshanc
---

[Keyshanc Source Code](https://github.com/Networc/keyshanc)

###Input Parameters

The two input parameters to the Keyshanc function are:

* An array of 95 characters (which does not need to be initialized)
* A string which serves as a "password"
<br />
###Step 1: SHA512 & SHA256 Hash

The first step of the algorithm is to compute both the SHA512 and the SHA256 hash of the password.
    std::string i = SHA512(password);
    std::string j = SHA256(password);
<br />
###Step 2: Initialize/Reset the Array

The array of ASCII characters must be reset in order to ensure that the same substitution cipher is always produced for a given password. This step also serves to initialize the values of the array if the calling program has not already done so.
    for (int x=0; x < 95 ; ++x)
    {
        keys[x] = char(x+32);
    }
The end result of this FOR loop is that keys\[\] now contains the ASCII characters 'Space' through '~', in order.

###Step 3: Declare Variables

The following variables are declared:
    int shuffleCode[95];
shuffleCode\[95\] is an array that will eventually contain "swap positions". In the final step of the Keyshanc function, the keys\[\] array is shuffled according to the "swap positions" in shuffleCode\[\].
    std::string hexString = "";
hexString is a string that temporarily holds pairs of hexadecimal characters just prior to their conversion to binary.
    std::bitset<8> aByte;
aByte is the binary representation of hexString.
    unsigned long numByte;
numByte is aByte after it has been converted to an integer.

###Step 4: Compute Swap Positions

This step is the heart of the Keyshanc algorithm. Each of the 64 bytes of the SHA512 hash and the first 31 bytes of the SHA256 are converted to an integer within the range of 0-94.
    //this FOR loop traverses the SHA512 hash string
    for (int x=0; x < 64; ++x)
    //this FOR loop traverses the SHA256 hash string
    for (int x=0; x < 31; ++x)
Again, Keyshanc uses all 64 bytes from the SHA512 hash but only 31 bytes from the SHA256 hash.
    //these two SWITCH statements process the SHA512 hexadecimal pairs
    switch (i[x*2])
    switch (i[(x*2)+1])
    //these two SWITCH statements process the SHA256 hexadecimal pairs
    switch (j[x*2])
    switch (j[(x*2)+1])
Since the hash strings i and j are in hexadecimal, the Keyshanc algorithm must process a pair of characters in each iteration of the FOR loops in order to capture an entire byte. The SWITCH statement indexed by \[x\*2\] processes the first half of the byte (most significant bits), while the SWITCH statement indexed by \[\(x\*2\)\+1\] processes the second half of the byte (least significant bits).
    case '0': hexString.append ("0000"); break;
    case '1': hexString.append ("0001"); break;
    case '2': hexString.append ("0010"); break;
    case '3': hexString.append ("0011"); break;
    case '4': hexString.append ("0100"); break;
    case '5': hexString.append ("0101"); break;
    case '6': hexString.append ("0110"); break;
    case '7': hexString.append ("0111"); break;
    case '8': hexString.append ("1000"); break;
    case '9': hexString.append ("1001"); break;
    case 'A': hexString.append ("1010"); break;
    case 'B': hexString.append ("1011"); break;
    case 'C': hexString.append ("1100"); break;
    case 'D': hexString.append ("1101"); break;
    case 'E': hexString.append ("1110"); break;
    case 'F': hexString.append ("1111"); break;
These case statements convert the hexadecimal characters of the two hash strings into their binary equivalents. These binary patterns are then appended to hexString. Once both SWITCH statements have completed, hexString will contain the binary equivalent of the current hexadecimal pair.
    aByte = std::bitset<8>(hexString);
This line converts hexString into a byte.
    numByte = aByte.to_ulong();
This line converts aByte into an integer.
    shuffleCode[x] = numByte%95;
This line reduces numByte so that it is in the range of 0-94 and stores it in shuffleCode\[\]. This is necessary because Keyshanc will use this number as a "swap position" in the final step of the algorithm.
    hexString = "";
This final line of code resets hexString for the next iteration of the FOR loop.

###Step 5: Shuffle the Array

The final step is to shuffle the array of ASCII characters.
    for (int x=0; x < 95; ++x)
The FOR loop traverses the entire array of ASCII characters.
    char temp = keys[x];
    keys[x] = keys[shuffleCode[x]];
    keys[shuffleCode[x]] = temp;
This block of code swaps the current ASCII character with the ASCII character located at the position referenced by shuffleCode.

For instance, assume that shuffleCode\[0\] is 1 and shuffleCode\[1\] is 2. On the first iteration of the FOR loop keys\[0\], which is 'Space', will be swapped with keys\[1\], which is '!'. On the second iteration of the FOR loop keys\[1\], which is now 'Space', will be swapped with keys\[2\], which is ' " '. So, after the first two iterations of the FOR loop, keys\[0\] is '!', keys\[1\] is ' " ', and keys \[2\] is 'Space'.

Once the shuffling is complete, keys\[\] represents a substitution cipher that is used by the calling program to encrypt and decrypt keystrokes. For example, if the user presses the 'Space' key, then the ASCII character located at keys\[0\] is transmitted. Likewise, if the user types '~', then keys\[94\] is transmitted. The receiving application performs a reverse lookup to determine the plaintext character.

