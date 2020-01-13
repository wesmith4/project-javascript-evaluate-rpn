# Project: Evaluate RPN Expressions

**Reverse Polish Notation** (**RPN**), also known as **postfix notation**, is an alternative way of writing arithmetical expressions like `5 + 4`. Instead of placing the operator (`+`, `*`, etc.) between numbers, we place it after two numbers.

For example,

- `5 + 4` becomes `5 4 +`
- `18 * 2` becomes `18 2 *`
- `7 * 5 + 1` becomes `7 5 * 1 +`

Let's write a function `evaluateRPN` that takes as input a string containing an RPN expression and returns the number that the input expression evaluates to.

See the [Wikipedia page on RPN][wiki-reverse-polish-notation]. We'll also explain more about how to read and write expressions in RPN / postfix notation below.

## Contents <!-- omit in toc -->

- [Learning Goals](#learning-goals)
- [Evaluating Arithmetical Expressions](#evaluating-arithmetical-expressions)
  - [Examples Of RPN And Infix Expressions](#examples-of-rpn-and-infix-expressions)
  - [An Advantage of RPN](#an-advantage-of-rpn)
- [[Optional] Design Exercise: Notation](#optional-design-exercise-notation)

## Learning Goals

You can think of RPN as a mini-language. It has its own syntax, semantics, etc. Your job is to write a program that "understands" or "interprets" expressions written in RPN. That is, you're going to write a function which takes a string containing an RPN expression and returns the number that the input expression evaluates to.

A JavaScript interpreter does something fundamentally similar to this: it reads in a bunch of text in the form of source code and then performs the actions encoded in the text. As a language, RPN is much, much simpler than JavaScript, but we hope you'll gain an inkling of what a JavaScript interpreter has to do.

We want you to practice...

1. The basic ingredients involved in interpreting a "mini-language", e.g., [tokenization][wiki-tokenization] and [parsing][wiki-parsing]
1. Using code as a medium to explore unfamiliar concepts
1. Expressing familiar ideas using new notation
1. Evaluating the pros / cons of different notational systems
1. Implementing and using basic data structures

## Evaluating Arithmetical Expressions

If we want to express the concept "the sum of 5 and 4" using only the symbols `+`, `5`, and `4`, there are at least three possible conventions we could adopt:

1. `+ 5 4`, called **prefix notation** or **Polish notation**
2. `5 + 4`, called **infix notation**
3. `5 4 +`, called **postfix notation** or **Reverse Polish notation**

You might feel strongly that infix notation is the "obvious" choice, but humans didn't invent that notation until the 14th century. Even so, humans were doing math and arithmetic thousands of years before that. We had different ways to express concepts like "the sum of 5 and 4", of course.

The point is that whatever benefits infix notation has, being "obvious" or "natural" isn't one of them. It took us thousands of years to invent!

Let's first look at some examples of postfix and infix expressions side-by-side. After that, we'll see some advantages of postfix notation.

### Examples Of RPN And Infix Expressions

| RPN                              | Infix                                      | Evaluates to |
|:---------------------------------|:-------------------------------------------|:-------------|
| `10 2 +`                         | `10 + 2`                                   | `12`         |
| `2 10 +`                         | `2 + 10`                                   | `12`         |
| `10 2 -`                         | `10 - 2`                                   | `8`          |
| `10 2 *`                         | `10 * 2`                                   | `20`         |
| `7 -7 +`                         | `7 + -7`                                   | `0`          |
| `5 10 2 * +`                     | `5 + (10 * 2)`                             | `25`         |
| `5 10 + 2 *`                     | `(5 + 10) * 2`                             | `30`         |
| `2 5 10 + *`                     | `2 * (5 + 10)`                             | `30`         |
| `5 4 * 3 + 2 *`                  | `((5 * 4) + 3) * 2`                        | `46`         |
| `15 7 1 1 + − * 3 * 2 1 1 + + −` | `15 * (7 - (1 + 1))) * 3) - (2 + (1 + 1))` | `221`        |

### An Advantage of RPN

Infix notation is ambiguous without additional conventions or syntax. Consider an expression like

```text
7 * 5 + 4
```

This is syntactically valid, but it can be interpreted in more than one way. Do we add 4 to the product of 7 and 5, to arrive at 39? Or do we multiply 7 by the sum of 5 and 4, to arrive at 63? We add parentheses to infix notation in order to make it clear what we mean:

```text
(7 * 5) + 4 = 35 + 4 = 39
7 * (5 + 4) =  7 * 9 = 63
```

How would we express the same two concepts using Reverse Polish notation?

```text
7 5 * 4 + = 35 4 + = 39
7 5 4 + * = 7 9 * = 93
```

No parentheses in sight! The syntax of RPN removes any possible ambiguity without having to invent a new syntax to disambiguate the order of operations (e.g., parentheses).

This also means we don't have to worry about *[order of operations][wiki-order-of-operations]* when using Reverse Polish notation. After all, we adopted that convention to make longer infix expressions less tedious to read and write. If we didn't have a convention around order of operations we'd be forced to use parentheses *everywhere* when using infix notation.

Compare:

```text
(((7 + 4) * ((6 * 5) + 2)) + 9) + 1   No order of operations
(7 + 4) * (6 * 5 + 2) + 9 + 1         Conventional order of operations
```

The order of operations is a solution to a problem we created ourselves by adopting infix notation.

## [Optional] Design Exercise: Notation

The three notations introduced here — prefix, infix, and postfix — are all *designed*. There's no universal answer to which one is best. Indeed, asking "Which notation is best?" probably makes as much sense as asking "Which notation is the happiest?" or "Which notation is the most flavorful?"

That doesn't mean [it's all just, like, your opinion, man][youtube-opinion-man]. Each notation interacts differently with the wider environment. How those interactions play out and how that informs our design choices *is* something we can study.

If we do a good job, we're likely to come to new insights around things like:

- How notational systems interact with the media in which the notation is used
- How the tools we use to express ourselves select for or against various notational systems
- ...and more!

See [DESIGN.md](DESIGN.md) if you're interested in exploring this.

[wiki-tokenization]: https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization
[wiki-parsing]: https://en.wikipedia.org/wiki/Parsing
[wiki-reverse-polish-notation]: https://en.wikipedia.org/wiki/Reverse_Polish_notation
[wiki-order-of-operations]: https://en.wikipedia.org/wiki/Order_of_operations
[youtube-opinion-man]: https://www.youtube.com/watch?v=pWdd6_ZxX8c
