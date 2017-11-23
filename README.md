## Install
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -<br>
sudo apt-get install -y nodejs<br>
sudo apt-get install -y build-essential<br>
npm install -g create-react-app<br>

## Clone repository
git clone git@git.janrtr.de:syp-lxc/Frontend.git<br>

## Build and run static server (http://localhost:5000)
cd Frontend<br>
npm install<br>
npm run build<br>
sudo rm -rf /var/www/html/*<br>
sudo cp -a build/* /var/www/html/<br>

## Pull newest revision
git pull<br>
npm install<br>
sudo rm -rf /var/www/html/*<br>
sudo cp -a build/* /var/www/html/<br>

## Configure Apache2 to work with React Router
add the following lines to the .conf file in sites-enabled:

	RewriteEngine On
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
	RewriteRule ^ - [L]

	RewriteRule ^ /index.html [L]
