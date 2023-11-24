+++ 
draft = false
date = 2018-04-19T15:38:41-05:00
title = "Trie Project"
description = ""
slug = ""
authors = []
tags = []
categories = ["C++"]
externalLink = ""
series = []
+++

### Fluff

Fourth term at Fanshawe College was a rough term. It took place during the summer and unlike most other terms, 3 courses were done the first half and the other 3 courses were done the other half. I did not like it since twice the content was pushed with only half the time for my mind to soak the information. Though I did have a lot of fun with the Trie Project in Design Patterns 2 with C++; I was strangely addicted to it and got it done before most people. I didn't have an addiction like it since my start in Warframe.

### First Week

I spent my first week figuring out how does a Trie look like? I spent a little too much time on it. I started writing a bit of code, pass some unit tests provided by the professor, and then code myself into some sort of wall. I think my initial design was that a trie had an array of nodes and each node had a pointer to another array of nodes and so on. After the next class I asked him what it looked like and this was my final design for a node with some stuff ripped out:

```
Struct node{
Node* pointerToParent;
Nibble parentIndex;
Value* pointerToValue;
Node* childrenPointers[16];
};
```

This time the node has an array of children which makes it a bit easier to comprehend instead of the weird pointer to an array of nodes I was doing earlier. The node having an array of children makes it so I can have the destructor call delete on the children so it automatically cleans up when a trie goes out of scope.

The nibble structure is just a simple struct that has one member which is an unsigned int with only 4 bits allocated for it. The syntax for doing it looks like: unsigned int value : 4; Looking back on it, I could have just used binary AND 15 to make sure my values never go past the value 15 instead of making another class to do the truncation for me.

The reason for using a nibble instead of a byte (from a char based string) is because when you use a byte for storing the key, a lot of the 255 bytes is not usually used most of the time and a lot of memory is wasted. The situation becomes worse when Unicode support is thrown in.

The trie class doesn’t have much. Just a bunch of using this_type = more_annoying_syntax<template params> and some constants such as:

```
Const size_type NUM_OF_NIBBLES = BYTE_TO_NIBBLE_FACTOR * sizeof(key_type::value_type)
```

The above constant is used for looping through a string or wstring nibble by nibble.

I also have a pointer to a node which is the root of the trie. My original implementation also had pointers for begin and end of the trie.

With everything in place I can finally start inserting stuff into the trie and do the first set of unit tests. The navigation logic for looks like:

```
For each(char_type ch in key)
For(int nibbleNum = NUM_OF_NIBBLES – 1; nibbleNum >= 0; --nibbleNum)
Nibble = ch >> NIBBLE_SIZE * nibbleNum;
// do stuff.
```

I bit shift the values for the current nibble and the nibble data type will truncate everything else so I don't have to worry about going out of index bounds. I find it to be pretty neat.

Visual representation after the statement: trieInstance["bat"] = 5 using my excelent MS Paint skills.

![Layout of trie for the entry bat](/images/Pre2023/trie_example.png)

Each nibble is used as an index to the pointer to the next node.

The last node is what 'bat' points to. The value 5 is stored there along with the word "bat" in a std::pair. Each node has a pointer to an std::pair since most nodes are not storing a value. It also makes operations such as move and swap easier since I only have to copy over a pointer to a pair instead of the entire contents of the pair.

### Week 2

Week 2 was the week I worked with iterators! It was a fun week. Half the time I spent was debugging my insert and delete function because of if else statements used to determine beginning and end nodes.

The iterators were one of the few times I used recursion in programming; the class mates I talked to used loops.

Looking back, one of the things I am unhappy about was the 'end' node. There is no formal definition for end, it is just a point that is marked as past the last element in a container. I made my 'end' as one memory address past the last node so if I wanted to check if I am at end I would have to have a reference to the trie and see if the node is at the end.

I could probably have used nullptr to determine end, but I also use it to determine the root node since the parent pointer of that is nullptr and it would be really confusing if nullptr could mean more than the two things I am using it for (root node and a child index that doesn't point to anything). Then again, end pointer is the first thing I check before doing the recursive searching so maybe nullptr would have worked well.

Reverse iterator was easy to implement since the standard template library has a wrapper class for reverse iterators; all I had to do was make my trie iterator follow the iterator interface.

### Last Day

After iterators were complete, copy constructors and other features were very easy to implement; it was a smooth experience.

### Submission Week

On the week the trie project was due I made one change, begin and end functions will search for the begin and end nodes instead of add and delete functions managing it in if statement blocks. After that was done, not only could I have saved several hours debugging the if statements, I also pass the professor's unit tests faster. Waaaaahhhhhhh!
## Other Notes

### Nodes Storing Count

On my C++ Professors node that he drew on the board, he had a count variable that stores the number of values that the current node and it's children have. I opted to only store the total count in the trie. If I wanted the count of specific node and it's children, I could recursively find it if necessary. I do not believe there is a right or wrong answer to this issue; it is just a CPU vs. RAM issue. For a college course, any of the two solutions are fine. In a server or embedded system environment, some thought may have to be put into it.

### Pruning

Pruning is an interesting topic to me. When I implemented delete functionality on my trie, the childhood experience on the family farm told me to prune dead branches because they are not needed and take up space. However, my professor did tell me that there are times when you would want to keep dead branches. An example he gave was a router since after an ipaddress has not been used for a while, an address might become active again, or a very similar one might use most of a dead branch; therefore pruning might be a waste of time.

Since my project was done I did not make the change since I may have to update my iterator routines to handle dead branches.

