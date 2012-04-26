---
layout: post
title: KeyshancRT Demo
tags: keyshanc, real-time
description: A demo of the Keyshanc real-time variant, KeyshancRT.
keywords: keyshanc, keyboard encrypter, keyboard encryption, real-time
hashtag: keyshanc
---
This post demonstrates how [KeyshancRT](http://andrewcreed.com/2012/04/25/keyshanc-real-time-overview.html) encrypts and decrypts messages.

<h2>KeyshancRT Encryption Demo</h2>
Password to Encrypt with:<br />
<input type="password" id="encryptPassword" /><br />
Text that <b>should not</b> be encrypted \(e.g. Twitter @usernames, \#hashtags, etc.\):<br />
<textarea rows="4" cols="60" id="plainText" onkeypress="encryptKeyshancRT(document.getElementById('encryptPassword').value)"></textarea><br />
Text that <b>will</b> be encrypted \(Tip: If you want to encrypt a URL, use a URL shortener since Twitter won't automatically shorten with t.co\):<br />
<textarea rows="4" cols="60" id="inText" onkeypress="encryptKeyshancRT(document.getElementById('encryptPassword').value)"></textarea><br />
KeyshancRT Output:<br />
<textarea rows="4" cols="60" id="outText"></textarea><br />
<input type="button" value="Commit to Tweet" onclick="generateTweetRT(document.getElementById('outText').value)" /><br />
<div id="dynamicTweet"></div><br />

<h2>KeyshancRT Decryption Demo</h2>
Password to Decrypt with:<br />
<input type="password" id="decryptPassword" /><br />
Message encrypted with KeyshancRT \(you can copy\-paste an entire message, the plaintext will remain unchanged\):<br />
<textarea rows="4" cols="60" id="encryptedText" onkeypress="decryptKeyshancRT(document.getElementById('decryptPassword').value)"></textarea><br />
Decrypted Message:<br />
<textarea rows="4" cols="60" id="decryptionOutput"></textarea><br />

This entire post is MIT Licensed.
