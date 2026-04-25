+++
draft = false
date = 2026-04-22T21:43:01-04:00
title = "Checklist App"
description = ""
slug = ""
authors = []
tags = []
categories = ["Miscellaneous"]
externalLink = ""
series = []
+++

I was using a very basic checklist app on my phone the last few years but it was slowly getting more adds which is annoying.
Google Keep Notes was already on my phone but even though it does not have any adds, I don't want Google having access to my weekly groceries.

I was checking out Gemma 4 E2B on my computer and I decided to vibe a little bit. When it made a functional checklist,
I added a menu of checklists and offline functionality. The tiny model was a bit too confused about getting a menu of
checklists when there was already checklist.

[Checklist App](/checklist)

### Usage notes
* Press enter to add items
* Double click the delete button to delete a checklist

### Development Notes
I had to move from localStorage to indexedDB so it can work in offline mode.
If I want to save when the user navigates away, I had to make the serviceWorker handle it
since indexedDB operations are asynchronous and the visibilitychange event will not wait for it.
