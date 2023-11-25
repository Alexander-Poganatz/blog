+++ 
draft = false
date = 2017-08-26T02:58:00+00:00
title = "Pointers"
description = ""
slug = ""
authors = []
tags = []
categories = ["C++"]
externalLink = ""
series = []
+++

Pointers are what seperate C/C++ from other programming languages as memory addresses can be accessed directly

```
int x = 5;
int* ptr = &x;
```

The last line basically reads as: integer pointer ptr = memory address of x.

What can also be done is:

```
int zPtr = new int(42);
```

This will allocate memory for an integer initilized with the value 42 on the heap instead of the stack

If a failure occurs, new will return 0 or an exception

Memory has to be clean up when it is done with.

```
delete zPtr;
```

To assign a value to the pointer, **do not use:**

```
ptr = 10;
```

This is an error since we are trying to point to 10. The proper is way is dereference with *:

```
*ptr = 10;
```

This will assign the value 10 to the memory that ptr is pointing to.

You can also have pointers to pointers:

```
int** pPtr = &ptr;
```

Reading the stored value would require dereferencing twice

```
**pPtr = 45
```

## Contant Pointers

First off, you can not assign a constant int to a normal int *

```
int const anInt = 20;
int* intPtr = &anInt;// Error
```

It is possible to assign a normal integer to a constant pointer

```
int normalInt = 10;
int const * constIntPtr = &normalInt;
```

While you can do the above, you can not derefence constIntPtr to change the value

Note: const int * is the same as int const *

The above was dealing with pointers to constants, however, pointers can also be constant.

```
int ten = 10;
int * const constantPointer = &10
```

The above line of code declares a constant pointer. The value it points to can change but the pointer to that block of memory can not

There is also a constant pointer to a constant value, which means nothing can change.

```
int const * const constantPointerToConstantValue;
```

A simple trick to read pointer type declaration is to read it right to left. The above code would then easily be read as a constant pointer to a constant int.

This blog post is licensed under [Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1)
