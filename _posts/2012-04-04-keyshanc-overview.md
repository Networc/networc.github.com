---
layout: post
title: Keyshanc Overview
tags: keyshanc
description: An overview of the KEYboard SHA-based eNCrypter.
keywords: keyshanc, keyboard encrypter, keyboard encryption
hashtag: keyshanc
---

##Background

Over the last year and a half, I have had the opportunity to work on the implementation of a medium-scale virtual desktop infrastructure (VDI) (approx. 2300 total seats). One of the benefits of a VDI is the ability to seamlessly provide the same desktop to a user whether they are working locally or remotely (e.g. telework). This allows the user to access their data and applications from home while the virtual desktop remains on the company's LAN; however, allowing a user to connect to a virtual desktop from their personal computer poses some security concerns. Chief among these risks are keyloggers since the user's primary interaction with their virtual desktop is via mouse and keyboard input.

The security concern above was my initial inspiration for Keyshanc. I have since thought of other scenarios that might benefit from Keyshanc (discussed later).

Note: While the military can use the [Lightweight Portable Security (LPS)](http://www.spi.dod.mil/lipose.htm) bootable CD to provide users with a secure workstation, many businesses may not have the funding or the ability to produce such a CD.

##Goals

I set out to devise a solution that would:

* <i>Reasonably</i> render keyloggers ineffective at recording keystrokes (i.e. the effort to decode the keystrokes would <i>not</i> be insignificant)

* Function on any workstation without the need to install any new software on the workstation itself

##Assumptions

* Since the workstation is unaware that the user is employing Keyshanc, ASCII characters other than 'Space' through '~' (codes 32-126) cannot be altered.

* Since no method is in place to ensure timing between the keyboard and destination application, a stream-based cipher cannot be used.

<i>more to follow</i> 


