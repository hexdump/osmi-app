======
 Osmi
======

An application for administering olfactory sensitivity tests.

Installation
============

TBD


Issue Reporting
===============

Feel free to report any issue, question, or feature request you may have. However, try to include as much information as possible and follow the example templates in Issues.

Building
========

MacOS
-----

First, clone the repository through the following command:

.. code::

	git clone https://github.com/osmi-app/osmi-app.git


First, you'll want to install the :code:`homebrew` package manager:

.. code:: bash 

   ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Then, use :code:`homebrew` to install :code:`node`

.. code:: bash
   
   brew install node

And use the newly installed Node Package Manager, :code:`npm`, to install cordova, like so

.. code:: bash

   npm install -g cordova

Once you've installed cordova, you'll want to install the desired platform for the Cordova app. Within the :code:`osmi` directory, to add the iOS platform, run

.. code:: bash

   cordova platform add ios

and for Android

.. code:: bash

   cordova platform add android

Then, to run it on either platform, assuming that you have the appropriate SDK installed, run either

.. code:: bash

   cordova run ios

or

.. code:: bash

   cordova run android

