---
layout: post
title: Keyshanc Ported to Javascript
tags: keyshanc, javascript
description: Keyshanc has been ported to Javascript to enable decryption of Keyshanc on websites. A demo is provided.
keywords: keyshanc, keyboard encrypter, keyboard encryption, javascript
hashtag: keyshanc
---
This post demonstrates how to use the [Keyshanc Javascript](https://github.com/Networc/keyshanc/tree/master/javascript). Type your Keyshanc password in the password field and press the "Keyshanc" button. If you want to disable Keyshanc, delete all text from the password field and press the "Keyshanc" button again.<br />
###Examples
Use "aragorn" as the Keyshanc password and paste the following into the "Input" text box:<br />
<pre><code>&TxJYUT$J1}JFKUT$J18xDJmqqJmT(JUTJ18xJ(mK/TxzzJFUT(J18xD</code></pre><br />
Use "bilbo" as the Keyshanc password and paste the following into the "Input" text box:<br />
<pre><code>7Ao!4KA'!&lt;E!zdKA'!&lt;Roa!P55!PA^!KA!&lt;Ro!^PdpAoVV!zKA^!&lt;Roa</code></pre><br />
<br />
<form action="" id="myForm" >
Keyshanc Password:<br />
<input type="password" name="password" /><input type="button" value="Keyshanc" onclick="keyshanc(myForm.password.value)" /><br />
Input:<br />
<textarea rows="4" cols="60" name="inText" onKeyPress="decryptKeyshanc()"/></textarea><br />
Output:<br />
<textarea rows="4" cols="60" name="outText" /></textarea><br />
<br />
</form>
This entire post is MIT Licensed.