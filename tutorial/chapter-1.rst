What is UniversalPython
========================

UniversalPython is a **transpiler** that allows you to write Python code using keywords and identifiers in your **native human language**.

It is not a new language, nor a fork of **Python**. It is a thin compatibility layer that translates code written with localized keywords into **standard** **Python**. Your code is executed by the **official** **Python** **interpreter**, and behaves just like any other Python program.

The goal of UniversalPython is to make programming in Python more accessible, especially for beginners and students learning in non-English environments.

Transpiler, Not Interpreter
---------------------------

UniversalPython works by **transpiling** code that is, converting it from one form (Python written in a different human language) to another (standard Python source code), before running it.

This means:

- You are still writing **real Python code**
- Your code will work with **standard Python tools, libraries, and environments**
- The result is indistinguishable from code written in standard Python

Why This Matters for Learners
-----------------------------

Python is one of the most widely used languages in education. However, Python's syntax, although simple, is still written in English.

For many learners (who are not from English speaking countries), especially young students or those new to programming, the English vocabulary can be a barrier. **UniversalPython** helps reduce that barrier by translating code to and from the learner’s own language.

This allows learners to focus on **logic and structure**, not foreign keywords.

For example, a French learner might write:

.. code-block:: text
   :linenos:
   
    something = 2

    si something == 1:
      imprimer ("Hello")
    sinonsi something == 2:
      imprimer ("World")
    sinon:
      imprimer ("Didn't understand...")

Python will understand it as:

.. code-block:: python
   :linenos:

    something = 2

    if something == 1:
      print("Hello")
    elif something == 2:
      print("World")
    else:
      print("Didn't understand...")


