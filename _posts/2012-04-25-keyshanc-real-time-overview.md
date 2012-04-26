---
layout: post
title: Keyshanc Real-Time Overview
tags: keyshanc, real-time
description: A variant of the Keyshanc algorithm that changes every minute.
keywords: keyshanc, keyboard encrypter, keyboard encryption, real-time
hashtag: keyshanc
---
##What is Keyshanc Real\-Time?
Keyshanc Real\-Time, or KeyshancRT, improves upon the original Keyshanc algorithm by recomputing the shuffle every minute using a Time\-Based One\-Time Pad \(TOTP\).

A demo of KeyshancRT can be found [here](http://andrewcreed.com/2012/04/26/keyshancrt-demo.html).

##Why is this change important?
This change significantly reduces Keyshanc's main vulnerability: frequency analysis. It is much harder to conduct frequency analysis because an opponent will only have a minute's worth of ciphertext to analyze \(the success rate of frequency analysis depends on the amount of ciphertext available\). Additionally, should an opponent successfully analyze any given minute, this will not aid the opponent in decrypting any other minute's worth of ciphertext. Frequency analysis must be conducted for each minute.

Assuming that frequency analysis is no longer worth the opponent's time/effort, then the strength of KeyshancRT hinges on the complexity of the shared password. An opponent will always be able to conduct a brute force attack against the shared password, so choosing a good password is critical.

##What has been added?
The core Keyshanc function remains unchanged. The added steps for encryption are:

1. Compute the number of minutes since the Unix epoch \(00:00:00 UTC on 1 January 1970\). This is used as the "counter" for the TOTP function.
2. Use the shared password to create a 160\-bit seed for the TOTP function. This is done by computing the SHA-1 hash of the shared password and then appending this hash to the shared password for a second SHA-1 hash.
3. Every minute, calculate an 8 digit TOTP pin using the seed from Step 2 and the number of minutes from Step 1.
4. Every minute, recompute Keyshanc using the shared password concatenated with the 8 digit pin.
5. Every minute, create a 4 digit timestamp and prepend it to the encrypted message. The timestamp is encoded in Base94 using the ASCII characters ! through ~ as the "digits". ¥ is used as the delimiter for the timestamp. This timestamp will not "roll over" until June 2118.

Decryption uses similar steps as above, except that the timestamp of the message is used as the basis for the TOTP function rather than the current time.
