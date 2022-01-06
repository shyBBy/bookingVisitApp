# bookingVisitApp 

# About it 
It's........


# How to use it on WINDOWS

1. Install [NODE-V16.13.1 - DOWNLOAD CLICK HERE](https://nodejs.org/dist/v16.13.1/node-v16.13.1-x64.msi)
2. Install [XAMPP 8.1.1 - DOWNLOAD CLICK HERE](https://www.apachefriends.org/xampp-files/8.1.1/xampp-windows-x64-8.1.1-2-VS16-installer.exe)
3. Launch XAMPP Control Panel
    1. Click **Start** on **MYSQL** and **APACHE**.
    2. Click **Admin** on **MYSQL**
    3. Click **IMPORT** from top navbar and choose **booking_visit_app.sql** from main folder on github repo. After uploading the file, click **GO** at the bottom of the page.
4. Navigate to downloaded folder (bookingVisitApp)
5. Type: ``` npm i ```
6. Type: ``` node index.js ```


# **change in /utils/db.js** 
host: localhost,
user: root,
database: booking_visit_app,


# **and in index.js**
app.use(cookieSession({

   name: 'session',

   keys: ['**TYPE_HERE_YOUR_SECRET_KEY**'],
   
# and restart via
Type: ``` node index.js ```




