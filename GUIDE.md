# 💰 Mes Pochettes — Guide d'installation

## Ce que fait l'application

- Crée des **pochettes** (Vacances, PEA, Épargne sécurité, PEL...)
- Définis un **objectif** et un **versement mensuel** pour chaque pochette
- Visualise la **répartition** de ton budget
- Ajoute des **versements** au fur et à mesure
- Fonctionne sur **ordinateur et mobile** (installable comme une vraie app)
- **100% gratuit** — tes données restent sur ton appareil

---

## Étape 1 — Installer Node.js (si pas déjà fait)

Va sur https://nodejs.org et télécharge la version **LTS** (recommandée).

---

## Étape 2 — Lancer l'application en local

Ouvre un terminal dans le dossier `budget-app` et tape :

```bash
npm install
npm run dev
```

Puis ouvre http://localhost:5173 dans ton navigateur.

---

## Étape 3 — Déployer gratuitement sur Vercel (accès depuis partout)

### 3a. Crée un compte GitHub gratuit
→ https://github.com

### 3b. Crée un nouveau dépôt et pousse le code

```bash
git init
git add .
git commit -m "première version"
git remote add origin https://github.com/TON-PSEUDO/mes-pochettes.git
git push -u origin main
```

### 3c. Déploie sur Vercel
1. Va sur https://vercel.com
2. Connecte ton compte GitHub
3. Clique **"Add New Project"**
4. Sélectionne ton dépôt `mes-pochettes`
5. Clique **Deploy** — c'est tout !

Vercel te donne une URL comme `https://mes-pochettes.vercel.app` — **accessible depuis n'importe où**.

---

## Étape 4 — Installer sur ton téléphone (comme une vraie app)

Une fois l'app déployée sur Vercel :

### Sur iPhone (Safari)
1. Ouvre l'URL dans Safari
2. Tape l'icône **Partager** (carré avec flèche)
3. Choisis **"Sur l'écran d'accueil"**
4. L'icône 💰 apparaît sur ton écran comme une vraie app !

### Sur Android (Chrome)
1. Ouvre l'URL dans Chrome
2. Appuie sur le menu **⋮** (trois points)
3. Choisis **"Ajouter à l'écran d'accueil"**
4. C'est installé !

---

## Structure du projet

```
budget-app/
├── src/
│   ├── App.jsx        ← Toute la logique de l'app
│   └── main.jsx       ← Point d'entrée React
├── public/
│   ├── manifest.json  ← Config PWA (icône, nom...)
│   └── sw.js          ← Service Worker (mode hors-ligne)
├── index.html
├── package.json
└── vite.config.js
```

---

## Étape suivante — Connecter Firebase (sauvegarde cloud)

Actuellement, les données sont sauvegardées dans ton navigateur (`localStorage`).  
Pour synchroniser entre ton téléphone et ton ordi, on peut ajouter **Firebase** (gratuit).

Dis-moi quand tu es prêt pour cette étape !
