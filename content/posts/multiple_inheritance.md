+++ 
draft = false
date = 2017-08-26T02:54:00+00:00
title = "Multiple Inheritance in C++"
description = ""
slug = ""
authors = []
tags = []
categories = ["C++"]
externalLink = ""
series = []
+++

C++ allows for multiple inheritence. While this is a strong feature, it is also a dangerous one if care is not taken.

To start, this is what we might expect of multiple inheritence relationship

![Might Expect Class Diagram](/images/Pre2023/ClassDiagram.png)

But this is what actually happens:

![](/images/Pre2023/ClassDiagramActual.png)
As you can see, the Bernies Mountian and Golden Retriever classes each have their own dog class instead of sharing one. Here is a representation in ram:

![Ram Representation](/images/Pre2023/ram1.png)

Problem one is that if we want a pointer to a Hybrid objects Dog object, the compiler will not know which dog to use.

```
Hybrid h;
Dog* d = &h; //Error, Dog is ambiguous
```

Clearing ambiguety is as easy as stating which class pointer to use:

```
BernieMountain bPointer = &h;
GoldenRetriever rPointer = &h;
Dog* dogPointer = (GoldenRetriever)&h; //Point to the golden retirever dog class
```

Performing the above is known as upcasting and it happens at compile time so there is not runtime hit

### Going the otherway

Upcasting can be done but what about downcasting?

```
Hybrid* downCastResult = dynamic_cast(dogPointer);
```

This is how you would perform a down cast. It happens at run time

#### Going from Bernie Mountian to Golden Retriever

If you wanted to Bernie Mountain pointer point to the golden retriever, you can if you want, I never explored this topic so it ends here

```
BernieMountain* bernPointer = dynamic_cast(gPointer);
```

### What if I want to do the original concept?

Answer: virtual tags. Virtual tags everywhere!
class BernieMountain : virtual public dog {/*class stuff*/};

It basically looks like this:

![Virtual Tag Class Diagram](/images/Pre2023/ClassDiagram3.png)

Ram representation:

![Virtual Tag Class Ram Representation](/images/Pre2023/ram2.png)

#### Notes on this:

If Dog had an abstract method like bark and it were to be implemented in Bernie but not Golden, Golden will use the Bernie Mountain Bark

If Golden were to implement bark also, the compiler will still to complain about imbiguity. The solution would be implement bark in Hybrid.

### Static and Interpret Casts

Static casts are a safe and dynamic upcast

```
Dog* anotherPointer = static_cast(pointerToBernie);
```

Interpret casts is a dangerous cast that you can use to point to anything

```
Dog* dogP reinterpret_cast(aBerniePointer);
```

Reinterpret casts do not check object types so only use them if you know what you are doing. An example of this being ok is if you are sending an object as a byte array over the network

Stuff by Alexander Poganatz. Information may be incorrect

This blog post is licensed under [Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1)
