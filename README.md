# bookingVisitApp 

# info dla MegaK

1. Nalezy podać e-mail, na który będziecie mogli się zalogować aby kliknąć w link aktywacyjny.

2. Dane do testowych kont (oprocz użytkownika bo to sami możecie zrobić)

**Doktor:**

login: testowy@doktor.pl

haslo: testowydoktor

**Admin:**


login: testowy@admin.pl

haslo: testowyadmin 


Planuje przepisać całą aplikacje z expressa na NestJS wraz z TS oraz handlebarsy na reacta i również w TS.
hRzeczy, które znajdą się w aplikacji podczas przepisywania:
1. System powiadomień o zmianie statusu zgłoszenia 
2. Możliwość korespondencji dot. danej wizyty na linii pacjent-lekarz.
3. Możliwość uzupełnienia profilu (avatar, dane kontaktowe itp).
4. Wykorzystanie passportJS oraz JWT.
5. Większa ilość informacji o placówkach.
6. I rzeczy, które jeszcze mi przyjdą na myśl w późniejszym czasie.

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
1. host: localhost,
2. user: root,
3. database: booking_visit_app,


# **and in index.js**
app.use(cookieSession({

   name: 'session',

   keys: ['**TYPE_HERE_YOUR_SECRET_KEY**'],
   
# and restart via
Type: ``` node index.js ```




