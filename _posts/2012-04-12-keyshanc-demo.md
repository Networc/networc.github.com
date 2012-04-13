---
layout: post
title: Keyshanc Demo
tags: keyshanc, teensyduino
description: A demo of a Keyshanc-enabled webpage.
keywords: keyshanc, keyboard encrypter, keyboard encryption, teensyduino
hashtag: keyshanc
---
This post demonstrates how a Keyshanc-enabled website might function. The underlying Javascript is hard-coded to decrypt the input text according to the Keyshanc Teensyduino's first default password \(\[F1\], aragorn\).<br />
<br />
<form action="" id="myForm" >
Input:<br />
<input type="text" name="inText" onKeyPress="convertString()"/><br />
Output:<br />
<input type="text" name="outText" /><br />
<br />
This entire post is MIT Licensed.

<script type="text/javascript" language="JavaScript">
//keyshanc based on aragorn
var keyshancF1 = [74, 61, 37, 73, 93, 64, 59, 97, 55, 79, 104, 100, 92, 78, 34, 105, 50, 102, 39, 72, 71, 35, 48, 119, 94, 117, 43, 86, 98, 90, 80, 107, 41, 54, 60, 81, 45, 32, 82, 91, 58, 116, 96, 118, 123, 69, 42, 38, 95, 76, 89, 51, 83, 67, 110, 124, 44, 112, 53, 103, 106, 114, 46, 101, 57, 109, 70, 121, 40, 120, 126, 36, 56, 85, 108, 47, 113, 68, 84, 125, 87, 111, 75, 122, 49, 115, 88, 99, 52, 77, 62, 65, 66, 63, 33];

function convertString() {
    s1 = new String(myForm.inText.value);

    var s2 = new String("");

    for (x = 0; x < s1.length; x++) {
        if (s1.charCodeAt(x) >= 32 && s1.charCodeAt(x) <= 126)
        {
            for (y = 0; y < 95; y++) {
                if (s1.charAt(x) == String.fromCharCode(keyshancF1[y]))
                {
                    s2 = s2.concat(String.fromCharCode(y+32));
                    break;
                }
            }
        }
        else
        {
            s2 = s2.concat(s1.charAt(x));
        }
    }

    myForm.outText.value = s2;
}

</script>
</form>
