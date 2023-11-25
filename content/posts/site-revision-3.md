+++ 
draft = false
date = 2023-11-25T12:00:01-05:00
title = "Site Revision 3"
description = ""
slug = ""
authors = []
tags = []
categories = ["Miscellaneous"]
externalLink = ""
series = []
+++

After not touching my site for a few years, I decided to revamp it from using just using raw HTML/PHP to using a static site generator. First, I will talk about Version 2 of the site.

# Version 2

Version 2 is basically version 1 but with W3.css instead of bootstrap. Yes, I was using a CSS Library developed by W3 Schools instead of Twitter.

Reasons I can think of why I made the decision:
* W3.css is a lot smaller than bootstrap. Years ago, bootstrap.min.css was 123kb while W3.css is 21kb.
* W3.css has all the features I needed
* W3.css has some color options available so I don't have to make any custom css to add a bit of color to my site.

Couple Pics of Version 1 (Left) and Version 2 (Right)

![Main page in older versions](/images/2023/Version1_Version2_Main.png)
![Blog page in older versions](/images/2023/Version1_Version2_Blog.png)

## Problem of Version 2 and 1

I wasn't using any template system.
This is important because for the most part I have to copy any headers and footers across pages, so making any page would involve copying an existing page and then gutting out the body.
Of course, that would make any redesigns difficult because I would have to manually copy paste stuff between all the different pages.

# Version 3

## Thoughts leading up to using Hugo
* In order to address the issue of no template system, I could use PHP, but then I am using PHP
* Using any other runtime is usually a more premium option by service providers
* I like using ASP.NET but I don't believe it is the best option for a simple content site that I want keep adding things to.
* Using something like Giraffe for F# to build some views and spit out some HTML files would be cool, but compile times are not the best. 
* HTML and source code is not the nicest thing to look at when making blog style content
* Non HTML formats may not go nicely into source control

At some point, I started hearing about static site generators where I can just make content pages and then it will build static files that are independent of any run time.
I discovered Hugo, which allows me to make content in markdown files which is a lot prettier than HTML. Besides that I just have to pick a theme, start git, edit a configuration file, and boom, new blog site.

## Other options I didn't pick
* Astro: It looks like it can provide the same thing as Hugo, but requires Node.js while Hugo is available in pre-built binaries via package managers
* Jekll: Requires the Ruby runtime. It looks like it can provide the same thing as Hugo.

I might be trying a bit two hard on avoiding scripting run times I don't usually use.

## Porting

Porting the C++ notes/blog posts was super easy since I could just copy paste the text from my previous site and then specify headers and images. 

There is a bunch of "Web Apps" I didn't port over. Mainly due to a combination of not being used and I do not think I have to show off simple web apps now that I have some industry experience. Some code is on Github anyway.
* Beer Recommendations: I don't drink as much beer these days
* Game Recommendations: Copy paste of beer recommendations, I never really fleshed out the content
* Poppy Seed Calculator: Simple app that converts feet or meters to poppy seeds. Poppy seeds is an imperial unit of measurement. 
* Random Dice Analyzer: Roles from options of D20, D12, D10, D8, D6, and D4 dice. I found out that the JavaScript random distribution is very even.
* JSON Translation Editor: just a web app that allows you to upload/download JSON files that have a bunch of key value pairs, along with a new value field which is the translation. I never ended up using it
* Risk of Rain 2 Items: Basically my own web app that loads a tsv file of items that I can search over. It got out of date as Risk Of Rain 2 kept getting patches and I stopped playing
* Dark Souls Checklist: Hard coded todo apps that saves the progress to local storage. I used it once and then never again. It is only for 4 dark souls achievements that require all of one type of equipment (spells/miracle/armour/weapons)

## Extra Pro of Hugo
One big pro I have is that I can attach categories and tags as some metadata in the mark down files and then Hugo can Generate pages that list out related content.
For example, on any blog post that I tagged with C++, you can can click on the tag that will bring you to a page that lists all other blog posts that have C++ in it.
Similarly, I can attach date metadata and pages get sorted by that.

## Con
Simple themes are basic and the site is a tad less colorful, but I can't get everything I want. Maybe I'll make a W3.css theme some day :p

# Other
This is basically a blog post so I have new content to justify replacing version 2 of my site.
Now that I have site organization and page linking as something I don't have to worry so much about, I might pump out more blog posts.

This blog post is licensed under [Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1)
