---
title: "راه‌اندازی BT-201 با AT Commands"
layout: post
author: Alireza Sabouei
---

## مقدمه

امروز تصمیم گرفتم ماژول **BT-201** را با استفاده از **UART** پیکربندی کنم تا برای پروژه‌های بعدی مجبور نباشم هر بار تنظیمات را دستی انجام دهم.

هدف این بود که یک برنامه ساده با **C#/.NET** بنویسم که بتواند دستورات AT را ارسال کند و پاسخ ماژول را نمایش دهد.

## سخت‌افزار

موارد استفاده شده:

* BT-201 Bluetooth Audio Module
* USB to TTL Converter
* Windows PC
* Visual Studio

اتصالات به صورت زیر بود:

```text
BT-201 TX -> USB-TTL RX
BT-201 RX -> USB-TTL TX
GND        -> GND
VCC        -> 5V
```

## تست اولیه

ابتدا با یک Serial Terminal ارتباط را تست کردم.

دستور زیر ارسال شد:

```text
AT
```

و پاسخ دریافت شد:

```text
OK
```

این نشان داد که ارتباط UART به درستی برقرار شده است.

## ساخت ابزار در .NET

برای جلوگیری از ارسال دستی دستورات، یک Console Application ساختم.

نمونه کد:

```csharp
using System.IO.Ports;

var port = new SerialPort("COM5", 9600);

port.Open();
port.WriteLine("AT");

string response = port.ReadLine();

Console.WriteLine(response);
```

## نتیجه

در نهایت توانستم تنظیمات BT-201 را بدون استفاده از نرم‌افزارهای جانبی تغییر دهم.

در مرحله بعد می‌خواهم:

* ارسال خودکار لیست دستورات
* ذخیره تنظیمات در فایل JSON
* نمایش وضعیت اتصال و Battery Level
