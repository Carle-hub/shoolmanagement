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

// Route pour obtenir la liste des étudiants
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des étudiants:', err);
      res.status(500).send('Erreur lors de la récupération des étudiants');
      return;
    }
    res.json(results);
  });
});

// Route pour ajouter un nouvel étudiant
app.post('/students', (req, res) => {
  const { name, class: className, section, dob, address, email, phone } = req.body;
  const sql = 'INSERT INTO students (name, class, section, dob, address, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, className, section, dob, address, email, phone], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      res.status(500).send('Erreur lors de l\'insertion dans la base de données');
      return;
    }
    res.status(201).send('Nouvel étudiant ajouté');
  });
});

// Route pour mettre à jour un étudiant
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, class: className, section, dob, address, email, phone } = req.body;
  const sql = 'UPDATE students SET name = ?, class = ?, section = ?, dob = ?, address = ?, email = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, className, section, dob, address, email, phone, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'étudiant:', err);
      res.status(500).send('Erreur lors de la mise à jour de l\'étudiant');
      return;
    }
    res.send('Étudiant mis à jour');
  });
});


// Route pour supprimer un étudiant
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM students WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'étudiant:', err);
      res.status(500).send('Erreur lors de la suppression de l\'étudiant');
      return;
    }
    res.send('Étudiant supprimé');
  });
});


// Routes pour les enseignants
app.get('/teachers', (req, res) => {
  const sql = 'SELECT * FROM teachers';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des enseignants:', err);
      res.status(500).send('Erreur lors de la récupération des enseignants');
      return;
    }
    res.json(results);
  });
});

app.post('/teachers', (req, res) => {
  const { name, subject, email, phone } = req.body;
  const sql = 'INSERT INTO teachers (name, subject, email, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, subject, email, phone], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      res.status(500).send('Erreur lors de l\'insertion dans la base de données');
      return;
    }
    res.status(201).send('Nouvel enseignant ajouté');
  });
});


//Route pour mettre a jour un professeur
app.put('/teachers/:id', (req, res) => {
  const { id } = req.params;
  const { name, subject, email, phone } = req.body;
  const sql = 'UPDATE teachers SET name = ?, subject = ?, email = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, subject, email, phone, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour dans la base de données:', err);
      res.status(500).send('Erreur lors de la mise à jour dans la base de données');
      return;
    }
    res.send('Enseignant mis à jour');
  });
});

app.delete('/teachers/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM teachers WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'enseignant:', err);
      res.status(500).send('Erreur lors de la suppression de l\'enseignant');
      return;
    }
    res.send('Enseignant supprimé');
  });
});


// Route pour récupérer toutes les classes
app.get('/classes', (req, res) => {
  let sql = 'SELECT * FROM classes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des classes :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des classes' });
    } else {
      res.json(results);
    }
  });
});


// Route pour ajouter une nouvelle classe
app.post('/classes', (req, res) => {
  const newClass = req.body;
  let sql = 'INSERT INTO classes SET ?';
  db.query(sql, newClass, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la classe :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de la classe' });
    } else {
      res.status(201).json({ id: result.insertId, ...newClass });
    }
  });
});


//Route pour mettre a jour une classe
app.put('/classes/:id', (req, res) => {
  const { id } = req.params;
  const { name, section } = req.body;
  const sql = 'UPDATE classes SET name = ?, section = ? WHERE id = ?';
  db.query(sql, [name, section, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour dans la base de données:', err);
      res.status(500).send('Erreur lors de la mise à jour dans la base de données');
      return;
    }
    res.send({ id, name, section });
  });
});


// Route pour supprimer une classe
app.delete('/classes/:id', (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM classes WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la classe :', err);
      res.status(500).json({ error: 'Erreur lors de la suppression de la classe' });
    } else {
      res.json({ message: 'Classe supprimée avec succès' });
    }
  });
});
// Route pour récupérer toutes les matières
app.get('/subjects', (req, res) => {
  const sql = 'SELECT * FROM subjects';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des matières:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.json(results);
  });
});

// Route pour ajouter une nouvelle matière
app.post('/subjects', (req, res) => {
  const { name, class_id, teacher_id } = req.body;
  const sql = 'INSERT INTO subjects (name, class_id, teacher_id) VALUES (?, ?, ?)';
  db.query(sql, [name, class_id, teacher_id], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la matière:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.json({ id: result.insertId, name, class_id, teacher_id });
  });
});

// Route pour mettre à jour une matière existante
app.put('/subjects/:id', (req, res) => {
  const { id } = req.params;
  const { name, class_id, teacher_id } = req.body;
  const sql = 'UPDATE subjects SET name = ?, class_id = ?, teacher_id = ? WHERE id = ?';
  db.query(sql, [name, class_id, teacher_id, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la matière:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.json({ id, name, class_id, teacher_id });
  });
});

// Route pour supprimer une matière
app.delete('/subjects/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM subjects WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la matière:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.sendStatus(204);
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
