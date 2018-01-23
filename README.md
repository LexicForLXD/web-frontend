## Backend API
The URL of the backend API can be set in the App component's state (src/App.js), e.g.:

    apiUrl: 'https://localhost:443/'

The OAuth 2.0 client id and client secret can be set in the Login component's state (src/Login.js):

    clientId: <client id>
    clientSecret: <client secret>

## Install
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -<br>
    sudo apt-get install -y nodejs<br>
    sudo apt-get install -y build-essential<br>
    npm install -g create-react-app<br>

## Clone repository
    git clone git@git.janrtr.de:syp-lxc/Frontend.git

## Run app in develompment mode (Port 3000)
    cd Frontend
    npm install
    npm start

## Build and run static server (Port 5000)
    cd Frontend
    npm install
    npm run build
    sudo rm -rf /var/www/html/*
    sudo cp -a build/* /var/www/html/

## Pull newest revision
    git pull
    npm install
    # Skip commands below, when running app in development mode
    sudo rm -rf /var/www/html/*
    sudo cp -a build/* /var/www/html/

## Configure Apache2 to work with React Router
Add the following lines to the .conf file in sites-enabled:

    RewriteEngine On
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]

    RewriteRule ^ /index.html [L]
