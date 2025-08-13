// server.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: 'http://localhost:8080', // Votre URL front-end
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school_management'
});
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

/**
 * --- Routes de comptage (pour les cards) ---
 */
app.get('/api/students/count', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM students', (err, results) => {
    if (err) {
      console.error('Erreur /students/count:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ count: results[0].count });
  });
});

app.get('/api/teachers/count', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM teachers', (err, results) => {
    if (err) {
      console.error('Erreur /teachers/count:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ count: results[0].count });
  });
});

app.get('/api/classes/count', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM classes', (err, results) => {
    if (err) {
      console.error('Erreur /classes/count:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ count: results[0].count });
  });
});

// Si vous gérez une table notifications :
app.get('/api/notifications/count', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM notifications', (err, results) => {
    if (err) {
      console.error('Erreur /notifications/count:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ count: results[0].count });
  });
});

/**
 * --- Routes CRUD existantes ---
 */
// Students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send('Erreur récupération étudiants');
    res.json(results);
  });
});
app.post('/students', (req, res) => {
  const { name, class: className, section, dob, address, email, phone } = req.body;
  db.query(
    'INSERT INTO students (name, class, section, dob, address, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, className, section, dob, address, email, phone],
    (err) => {
      if (err) return res.status(500).send('Erreur insertion étudiant');
      res.status(201).send('Nouvel étudiant ajouté');
    }
  );
});
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, class: className, section, dob, address, email, phone } = req.body;
  db.query(
    'UPDATE students SET name=?, class=?, section=?, dob=?, address=?, email=?, phone=? WHERE id=?',
    [name, className, section, dob, address, email, phone, id],
    (err) => {
      if (err) return res.status(500).send('Erreur mise à jour étudiant');
      res.send('Étudiant mis à jour');
    }
  );
});
app.delete('/students/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send('Erreur suppression étudiant');
    res.send('Étudiant supprimé');
  });
});

// Teachers
app.get('/teachers', (req, res) => {
  db.query('SELECT * FROM teachers', (err, results) => {
    if (err) return res.status(500).send('Erreur récupération enseignants');
    res.json(results);
  });
});
app.post('/teachers', (req, res) => {
  const { name, subject, email, phone } = req.body;
  db.query(
    'INSERT INTO teachers (name, subject, email, phone) VALUES (?, ?, ?, ?)',
    [name, subject, email, phone],
    (err) => {
      if (err) return res.status(500).send('Erreur insertion enseignant');
      res.status(201).send('Nouvel enseignant ajouté');
    }
  );
});
app.put('/teachers/:id', (req, res) => {
  const { id } = req.params;
  const { name, subject, email, phone } = req.body;
  db.query(
    'UPDATE teachers SET name=?, subject=?, email=?, phone=? WHERE id=?',
    [name, subject, email, phone, id],
    (err) => {
      if (err) return res.status(500).send('Erreur mise à jour enseignant');
      res.send('Enseignant mis à jour');
    }
  );
});
app.delete('/teachers/:id', (req, res) => {
  db.query('DELETE FROM teachers WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send('Erreur suppression enseignant');
    res.send('Enseignant supprimé');
  });
});

// Classes
app.get('/classes', (req, res) => {
  db.query('SELECT * FROM classes', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur récupération classes' });
    res.json(results);
  });
});
app.post('/classes', (req, res) => {
  db.query('INSERT INTO classes SET ?', req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur ajout classe' });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});
app.put('/classes/:id', (req, res) => {
  const { name, section } = req.body;
  db.query(
    'UPDATE classes SET name=?, section=? WHERE id=?',
    [name, section, req.params.id],
    (err) => {
      if (err) return res.status(500).send('Erreur mise à jour classe');
      res.json({ id: req.params.id, name, section });
    }
  );
});
app.delete('/classes/:id', (req, res) => {
  db.query('DELETE FROM classes WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Erreur suppression classe' });
    res.json({ message: 'Classe supprimée avec succès' });
  });
});

// Subjects
app.get('/subjects', (req, res) => {
  db.query('SELECT * FROM subjects', (err, results) => {
    if (err) return res.status(500).send('Erreur récupération matières');
    res.json(results);
  });
});
app.post('/subjects', (req, res) => {
  const { name, class_id, teacher_id } = req.body;
  db.query(
    'INSERT INTO subjects (name, class_id, teacher_id) VALUES (?, ?, ?)',
    [name, class_id, teacher_id],
    (err, result) => {
      if (err) return res.status(500).send('Erreur ajout matière');
      res.json({ id: result.insertId, name, class_id, teacher_id });
    }
  );
});
app.put('/subjects/:id', (req, res) => {
  const { name, class_id, teacher_id } = req.body;
  db.query(
    'UPDATE subjects SET name=?, class_id=?, teacher_id=? WHERE id=?',
    [name, class_id, teacher_id, req.params.id],
    (err) => {
      if (err) return res.status(500).send('Erreur mise à jour matière');
      res.json({ id: req.params.id, name, class_id, teacher_id });
    }
  );
});
app.delete('/subjects/:id', (req, res) => {
  db.query('DELETE FROM subjects WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send('Erreur suppression matière');
    res.sendStatus(204);
  });
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
