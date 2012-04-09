---
layout: post
title: Keyshanc Overview
tags: keyshanc
description: An overview of the KEYboard SHA-based eNCrypter.
keywords: keyshanc, keyboard encrypter, keyboard encryption
hashtag: keyshanc
---
##What is Keyshanc?

Keyshanc \(short for Keyboard SHA-based Encrypter\) is my attempt to thwart keyloggers by using keyboard-to-application keystroke obfuscation.

##Background

Over the last year and a half, I have had the opportunity to work on the implementation of a medium-scale virtual desktop infrastructure \(VDI\) \(approx. 2300 total seats\). One of the benefits of a VDI is the ability to seamlessly provide the same desktop to a user whether they are working locally or remotely \(e.g. telework\). This allows the user to access their data and applications from home while the virtual desktop remains on the company's LAN; however, allowing a user to connect to a virtual desktop from their personal computer poses some security concerns. Chief among these risks are keyloggers since the user's primary interaction with their virtual desktop is via mouse and keyboard input.

The security concern above was my initial inspiration for Keyshanc. I have since thought of other scenarios that might benefit from Keyshanc \(discussed later\).

Note: While the military can use the [Lightweight Portable Security (LPS)](http://www.spi.dod.mil/lipose.htm) bootable CD to provide users with a secure workstation, many businesses may not have the funding or the ability to produce such a CD.

##Goals

I set out to devise a solution that would:

* <i>Reasonably</i> render keyloggers ineffective at recording keystrokes \(i.e. the effort to decode the keystrokes would <i>not</i> be insignificant\)

* Function on any workstation without the need to install any new software on the workstation itself

##Assumptions

* Since the workstation is unaware that the user is employing Keyshanc, ASCII characters other than 'Space' through '~' \(codes 32\-126\) cannot be altered.

* Since no method is in place to ensure timing between the keyboard and destination application, a stream-based cipher cannot be used.

##Design

Simply put, Keyshanc is an algorithm that shuffles the keys of the keyboard based on a "password". It relies on a simple substitution cipher \- for any given password, a plaintext character will always result in the same ciphertext character being sent to the receiving application. Please read my [Keyshanc Code Walkthrough](http://andrewcreed.com/2012/04/06/keyshanc-code-walkthrough.html) for a more thorough discussion on the algorithm.

In order to use Keyshanc, both the keyboard \(or a device placed between the keyboard and computer\) and the receiving application must support Keyshanc and must be set to use the same password. Any software or devices between the keyboard and receiving application will only be able to capture the ciphertext characters.

##Vulnerabilities

Since Keyshanc uses a substitution cipher, it is vulnerable to frequency analysis; however, as stated above my primary goal in developing Keyshanc is to <i>reasonably</i> render keyloggers ineffective. Considering that my other main goal is for Keyshanc to work on any workstation without additional software requirements, it may be that a <i>reasonable</i> solution is all that is possible.

Also, since the receiving application decrypts the keystrokes prior to displaying them on the screen, Keyshanc is vulnerable to software that captures images of a user's session. Defeating such software, though, is beyond the scope of what I have set out to accomplish.

##Possible Usage Scenarios

* <u>Remote Virtual Desktop Login</u>: Upon initial connection \(<i>prior</i> to login\), the remote desktop would display a random Keyshanc password via CAPTCHA. This password would only be valid for the current session. This usage scenario would be useful when a business wants to allow its workforce to telework using personal computers.

* <u>Sensitive Data Entry on a Website</u>: A Keyshanc\-enabled website would allow the user to enter his/her password via a graphical keyboard. This usage scenario might be useful in an environment where the user is required to use potentially compromised workstations in order to conduct sensitive/risky tasks. "Compromised" could also be interpreted as "monitored by a 3rd party".