+++ 
draft = false
date = 2018-05-22T18:36:39-05:00
title = "Terminal Unity"
description = ""
slug = ""
authors = []
tags = []
categories = ["C++"]
externalLink = ""
series = []
+++

## Entry 1

I recently started to write a cross platform terminal user interface library. This was inspired by the console adapter project that I had to do in 5th semester. The only problem it has is that it is very Windows heavy so if I wanted Linux support I would anyway have to write the whole thing from scratch.

I am trying to make the API very simple, it will have shallow inheritance so I only expect one subclass on each platform. Write now the Windows version is using the WIN32 console API and I am currently working on a ncursesw implementation.

I hit a small road block since I thought ncursesw would have wide string functions but it only supports UTF-8 style strings. I might make my own functions to convert wide char to UTF-8 string or find one on the net.

Another roadblock is that I have to learn a cross platform build tool. CMake looks promising; I hope it has some sort of support for cross platform development since I want a if windows use this implentation else use that.

## Entry 2

Since last update, I spent most of my time researching outputting Unicode to Windows and Linux consoles. On windows, I could get away with wchar_t but the thing is it is only 16 bit on windows, so I can only support less than half of the currently available characters. Another note is that the console font on windows has to be changed. Currently my application does not change the code page since my default one is fine, but I may have to update it once I find one that works.

On Linux, I would have to convert Unicode characters to UTF-8 strings. I may also add a printUTF8 interface for the console API but I think I'll leave that as a future task. For now. Another thing I have to look into when getting input on Linux is if the input will also be UTF-8 encoded. Another note is that I also don't specify the locale when booting the terminal. I'm going to leave it to the user to specify the locale since there are a lot of different [language].UTF-8 on Linux; I think it is weird and no one should have to install en_US.UTF-8 on their system to use my application.


## Entry 3

The ncursesw implementation is well under way. I will have to cut some features from the baseline such as numpad and scroll wheel events. I might put scroll wheel back in if ncurses6 does support it and it becomes an available package to download from the advanced package tool by default.

Until my next entry I plan to be able to print out Unicode on ncursesw. The feature after that is to get Unicode input before I start figuring out how to build a library on Linux.

## Entry 4

I got Unicode output on both platforms ok; I am not supporting Unicode values above 65,535. The next step is Unicode input. I don't have to do anything different on windows since I am using wchar_t. On Linux, the terminals accept a Unicode value as a UTF-8 multibyte, so inputting one character may involve 1-4 calls to getch just to get all the information. My main routing is that if I get a value greater than 192 and less than 248, it will be the start of a Unicode value and I will attempt multiple getchs. Otherwise it may just be normal input.

On my keyboard, most of the input are ASCII and stuff like function keys or mouse clicks will have a value greater than 255.

UTF-8 continuation characters would be greater than 127 and less than 192.

Last updated 2018-05-22

