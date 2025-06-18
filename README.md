# warranty-reminder-desktop-app
A desktop application used to keep a list of your item warranties and set renewal reminders.


#Edit this later


#Temporary details

warranty-reminder-app

for locally running,
cd frontend -> npm run dev
cd backend -> run the app

for desktop feel, (while running in electron, frontend and backend need not run)
cd electron -> npm start

for deploying as a package,
cd frontend -> npm run build
copy the dist folder and paste to electron/frontend

cd backend -> build the project -> copy the jar file created under build/libs/jar file and paste to electron/app

cd electron -> npm run dist
This creates a .exec inside the electron-app/dist

To update the version
Mkae your changes
in electron-app/package.json, change the version
then run, npm run dist -- --publish=always
(If app not automatically uploaded then go to repo, release -> draft new release, add a tag v1.0.1
Upload the .exe and latest.yml
publish

github access token
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
