Supported Languages
===================

UniversalPython lets you write Python code using your preferred human language!  
While Python is the programming language behind the scenes, UniversalPython is a **transpiler** that supports writing Python code in multiple natural languages.

This allows developers worldwide to code in Python using the language they feel most comfortable with.


Supported Human Languages
-------------------------

UniversalPython currently supports the following human languages for coding:

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - **Language name**
     - **Language code**
     - **API Reference**
   * - English (default)
     - ``en``
     - `/api-reference <api-reference>`_
   * - French
     - ``fr``
     - `/fr/api-reference <fr/api-reference>`_
   * - Chinese
     - ``zh``
     - `/zh/api-reference <zh/api-reference>`_

.. note::

   **How It Works**

   You write your UniversalPython programs using localized Python syntax in your chosen language.  
   UniversalPython translates your code internally into standard Python, which is then executed as usual.

   Learn more about how UniversalPython works **`here <#>`__**.


Example
-------

Here is a simple function written in both English and French versions.

**English:**

.. code-block:: python

   def hello():     
       print("Hello, UniversalPython!")

   hello()

**French:**

.. code-block:: python

   déf hello():     
       imprimer("Hello, UniversalPython!")

   hello()


Getting Started
---------------

To begin writing Python in your preferred language, simply create a file using the following naming pattern:

```
filename.<language_code>.py
```

For example, for French, it would be:
```
greeting.fr.py
```

UniversalPython will automatically detect the language code and transpile your file accordingly.

You can find details, syntax mappings, and examples for each supported language in its dedicated documentation section.

Contributing
------------

Want to help expand UniversalPython’s language support or improve existing translations?
Visit the Community page to learn how to:

Contribute new language mappings

Suggest improvements or corrections

Collaborate with other developers

Together, we can make Python accessible to everyone—one language at a time.

.. .. rubric:: Chapters

.. We need to add chapters for each mapping.
