# 📦 Warranty Reminder App

A cross-platform desktop app to track your warranties and get timely reminders — built using **React**, **Spring Boot**, and **Electron**.

---

## 🚀 Features

- Add and edit warranty records
- Set reminders for expiry dates
- Works offline as a desktop app
- Auto-launch on system startup
- In-app update support via GitHub

---

## 🛠️ Local Development

### 1. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

### 2. Run Backend

```bash
cd backend
./gradlew bootRun
```

You can also run it from your IDE (IntelliJ).

---

## 🖥️ Electron Desktop App

> ⚠️ No need to run frontend/backend separately — Electron handles everything.

### Run Electron App

```bash
cd electron
npm install
npm start
```

To reflect any **changes**, follow the two steps below:

---

## 🔁 Reflect Changes in Electron App

### 1. Rebuild Frontend for Electron

```bash
cd frontend
npm run build
```

Then copy the generated `dist` folder to:

```
electron/frontend/
```

### 2. Rebuild Backend for Electron

Build the backend JAR:

```bash
cd backend
./gradlew build
```

Then copy:

```
backend/build/libs/backend-0.0.1-SNAPSHOT.jar
```

Paste it into:

```
electron/app/
```

---

## 📦 Build Installer for Distribution

```bash
cd electron
npm run dist
```

This will create a `.exe` and `latest.yml` inside:

```
electron/dist/
```

---

## 🔄 Auto-Update Support

### Update App Version

1. Bump the version in `electron/package.json`:

```json
"version": "1.0.1"
```

2. Run publish command:

```bash
cd electron
npm run dist -- --publish=always
```

### Manual GitHub Release (if auto-upload fails)

- Go to your GitHub repo → **Releases**
- Click **"Draft new release"**
- Tag the release (e.g., `v1.0.1`)
- Upload:
  - `.exe` file from `electron/dist/`
  - `latest.yml` from `electron/dist/`
- Click **Publish**

Your users will now receive the update automatically.

---

## 🗂 Project Structure

```
warranty-reminder-app/
├── backend/       # Spring Boot backend
├── frontend/      # React + Tailwind frontend
├── electron/      # Electron wrapper
│   ├── app/       # Contains backend JAR
│   └── frontend/  # Contains built frontend
```

---

## 🧠 Notes

- Electron auto-update works only for **public GitHub repos** or via authenticated release management.
- Don't forget to disable `webSecurity` only for development.

---

## 🙌 Contributions

Pull requests and issue reports are welcome!
