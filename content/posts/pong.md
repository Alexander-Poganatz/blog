+++ 
draft = false
date = 2018-04-19T16:52:56-05:00
title = "Pong"
description = ""
slug = ""
authors = []
tags = []
categories = ["C++"]
externalLink = ""
series = []
+++

### Fluff

The time had finally come for my last advanced C++ project at fanshawe. The project was to create a C++ wrapper library for Win32 Berkeley sockets and make a client/server program that used the library project. First thought no questions asked was to make Pong for two people to play over the network, no questions asked.

Due to the Ontario Colleges going on strike that term, I had Christmas break to work on it. Usually classes would be done by mid-December but they got extended a month.

### The Library

It is a very simple library, I had an AbstractSocket class that took care of the basics such calling WSAStartup and closing sockets. I then sub classed it into TCPServerSocket, TCPClientSocket, UDPServerSocket, and UDPClientSocket. Most of the time went into TCPServerSocket and TCPClientSocket. UDPServerSocket and UDPClientSocket only existed for the most part.

Normally games use UDP but for the scope of the project TCP was fine since it would be running on LAN or local host, it would also save me the trouble of dealing with unordered packets and such.

### The Game

The game ran on command prompt and I used my TUI (Terminal User Interface) library that I developed in Design Patterns 2 to handle the logic for displaying panels and text.

I had to do some game specific rendering logic and created my own custom Panel class to act as a double buffer or else flickering would occur from re-rendering the background, paddles, and ball in that order.

The server portion handled communication between clients and updating the game state.

The client portion handled receiving and sending data to the server and updating the local game state along with displaying a nice game of pong.

For the network packets, they were ordered as:

* First byte is the operation that occurred
* The remaining bytes in the packet contain the necessary data about the operation, such as updated ball coordinates or who won.

I am satisfied with how things turned out and it was a great way to end Fanshawe College.

![Screenshot of a server and two clients running](/images/Pre2023/pong.png)

After the term ended, I did one last update which was to support IPV6. It wasn't to big of a change. I just changed the internal address data type to one that is big enough to handle IPV6 and used getaddrinfo to handle allocating IPV4 or IPV6 address as needed. The AbstractSocket class took care of freeing it.

If I were to do this project again I would try to use the State design pattern to handle changing the state of the game. I used if statements and Boolean flags to handle changes in state but it is not very flexible.
[A very nice read on the topic of the State pattern in games.](https://gameprogrammingpatterns.com/state.html)

This blog post is licensed under [Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1)

