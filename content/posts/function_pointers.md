+++ 
draft = false
date = 2017-08-25T02:58:00+00:00
title = "Function Pointers"
description = ""
slug = ""
authors = []
tags = []
categories = ["C++"]
externalLink = ""
series = []
+++

This demonstration is just example code of a C function pointer

```
#include <iostream>

int add(int x, int y)
{
return x + y;
}

int subtract(int x, int y)
{
return x - y;
}

int main()
{
int (*fPtr)(int, int) = add; //Declaration and assignment.
fPtr = subtract; // demonstrating that it can point to different functions
std::cout << fPtr(2, 4) << std::endl;
} 
```

