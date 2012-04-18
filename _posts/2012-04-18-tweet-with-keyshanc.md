---
layout: post
title: Tweet with Keyshanc
tags: keyshanc, twitter
description: Keyshanc can be used to send encrypted messages over public communications like Twitter.
keywords: keyshanc, keyboard encrypter, keyboard encryption, twitter
hashtag: keyshanc
---
This post demonstrates how to use [Keyshanc](http://andrewcreed.com/2012/04/04/keyshanc-overview.html) to send encrypted Tweets.

1. Type your Keyshanc password in the password field and press the "Keyshanc" button.
2. Enter your message in the Input field \(the Javascript lags by one character, so be sure to enter an extra character in your message, such as 'Space'\).
3. Press the "Commit to Tweet" button to generate a Tweet button loaded with your ciphertext.
4. Press the "Tweet" button \(once it has been generated\) to send your encrypted message.

Keyshanc Password:<br />
<input type="password" id="password" /><input type="button" value="Keyshanc" onclick="keyshanc(document.getElementById('password').value)" /><br />
Input \(plaintext\):<br />
<textarea rows="4" cols="60" id="inText" onkeypress="encryptKeyshanc()"></textarea><br />
Output \(ciphertext\):<br />
<textarea rows="4" cols="60" id="outText"></textarea><br />
<input type="button" value="Commit to Tweet" onclick="generateTweet(document.getElementById('outText').value)" /><br />
<div id="dynamicTweet"></div>

This entire post is MIT Licensed.
