Setup
=====

UniversalPython can be used either **online** or **locally on your computer**.  
Choose the option that best fits your needs.

Online
======

You don’t need to install UniversalPython to try it out!  
Simply visit our **online playground**, where you can write and run UniversalPython code directly in your browser — no installation required.

**Playground URL:** `<https://universalpython.github.io/playground>`_

**Benefits**
------------

- No setup or configuration needed.
- Instantly try different human languages supported by UniversalPython.
- Great for testing syntax or quick demos.

**Limitations**
---------------

The online playground is designed for experimentation and has a few limitations:

- Limited execution time and memory.
- Restricted access to system commands and file operations.
- No ability to install additional Python packages.
- Temporary workspace (your code isn’t saved permanently).

For full functionality, install UniversalPython locally on your computer.

On Your Computer
================

If you want to use UniversalPython for real projects or contribute to language packs, install it locally.

Follow these steps carefully — this guide assumes no prior Python experience.

**1. Install Python 3.14 or newer**
-----------------------------------

Download and install Python from the official website:

- **Download Page:** `<https://www.python.org/downloads/>`_

During installation:
- ✅ Check the box that says **"Add Python to PATH"**.
- 🪟 On Windows, use **PowerShell** or **Command Prompt** to run commands.
- 🍎 On macOS or Linux, use **Terminal**.

Once installed, verify Python is available by running:

.. code-block:: bash

   python --version

You should see something like:

.. code-block:: text

   Python 3.14.0

**2. Verify pip is installed**
------------------------------

`pip` is Python’s package manager. It should be included with modern Python installations.

Check that it’s working by running:

.. code-block:: bash

   pip --version

If you see a version number (e.g., `pip 25.0`), you’re good to go.  
If not, refer to the Python documentation on installing `pip`:

- `<https://pip.pypa.io/en/stable/installation/>`_

**3. Install UniversalPython**
------------------------------

Once Python and pip are ready, install UniversalPython by running:

.. code-block:: bash

   pip install universalpython

This will automatically download and install the latest version.

**4. Verify installation**
--------------------------

After installation completes, test that UniversalPython is working:

.. code-block:: bash

   universalpython --help

If you see the UniversalPython help menu, you’re ready to start coding!

Using UniversalPython in Jupyter Notebook
=========================================

UniversalPython can also be used inside **Jupyter Notebook** for an interactive, notebook-based experience.

We provide an official Jupyter kernel that enables you to write and execute UniversalPython code directly in a notebook.

**Repository:** `<https://github.com/UniversalPython/universalpython_kernel>`_

**Installation Steps**
----------------------

1. Install Jupyter if you haven’t already:

   .. code-block:: bash

      pip install jupyterlab

2. Install the UniversalPython Jupyter kernel:

   .. code-block:: bash

      pip install universalpython_kernel

3. Register the kernel with Jupyter:

   .. code-block:: bash

      python -m universalpython_kernel.install

4. Launch JupyterLab:

   .. code-block:: bash

      jupyter lab

Once open, you’ll be able to select **UniversalPython** as a kernel when creating a new notebook.

.. **Next Steps**

.. - Learn more about supported languages: :doc:`supported-languages`
.. - Explore the API Reference: :doc:`api-reference`
.. - Join the Community: :doc:`community`

