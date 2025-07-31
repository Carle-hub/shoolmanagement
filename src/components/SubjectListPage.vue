<template>
  <div class="subjects-page">
    <h1>Gestion des Matières</h1>
    <button class="add-button" @click="showAddSubjectForm = true">Ajouter</button>

    <!-- Formulaire d'ajout de matière -->
    <div v-if="showAddSubjectForm" class="form-popup">
      <form @submit.prevent="addSubject">
        <h2>{{ editMode ? 'Modifier la Matière' : 'Ajouter une Nouvelle Matière' }}</h2>
        <label for="subjectName">Nom de la Matière:</label>
        <input type="text" id="subjectName" v-model="newSubject.name" required>

        <!-- Sélection de la classe -->
        <label for="classId">Classe:</label>
        <select id="classId" v-model="newSubject.class_id" required>
          <option v-for="classe in classes" :key="classe.id" :value="classe.id">{{ classe.name }}</option>
        </select>

        <!-- Sélection de l'enseignant -->
        <label for="teacherId">Enseignant:</label>
        <select id="teacherId" v-model="newSubject.teacher_id" required>
          <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
        </select>

        <button type="submit">{{ editMode ? 'Mettre à jour' : 'Ajouter' }}</button>
        <button type="button" @click="showAddSubjectForm = false">Annuler</button>
      </form>
    </div>

    <!-- Liste des matières -->
    <div class="subject-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la Matière</th>
            <th>Classe</th>
            <th>Enseignant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id">
            <td>{{ subject.id }}</td>
            <td>{{ subject.name }}</td>
            <td>{{ getClassById(subject.class_id).name }}</td>
            <td>{{ getTeacherById(subject.teacher_id).name }}</td>
            <td>
              <button class="edit-button" @click="editSubject(subject)">Modifier</button>
              <button class="delete-button" @click="deleteSubject(subject.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showAddSubjectForm: false,
      editMode: false,
      editedSubject: {
        id: '',
        name: '',
        class_id: '',
        teacher_id: ''
      },
      newSubject: {
        name: '',
        class_id: '',
        teacher_id: ''
      },
      subjects: [],
      classes: [],
      teachers: []
    };
  },
  methods: {
    fetchSubjects() {
      // Méthode pour récupérer les matières depuis l'API
      axios.get('http://localhost:3000/subjects')
        .then(response => {
          this.subjects = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des matières :', error);
        });
    },
    fetchClasses() {
      // Méthode pour récupérer les classes depuis l'API
      axios.get('http://localhost:3000/classes')
        .then(response => {
          this.classes = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des classes :', error);
        });
    },
    fetchTeachers() {
      // Méthode pour récupérer les enseignants depuis l'API
      axios.get('http://localhost:3000/teachers')
        .then(response => {
          this.teachers = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des enseignants :', error);
        });
    },
    addSubject() {
      // Méthode pour ajouter une nouvelle matière
      axios.post('http://localhost:3000/subjects', this.newSubject)
        .then(response => {
          this.subjects.push(response.data);
          this.newSubject = { name: '', class_id: '', teacher_id: '' };
          this.showAddSubjectForm = false;
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la matière :', error);
        });
    },

     editSubject(subject) {
  // Méthode pour préparer l'édition d'une matière
  this.editedSubject = { ...subject };
  this.editMode = true;
  this.showAddSubjectForm = true; // Modifier cette ligne
},
      updateSubject() {
      axios.put(`http://localhost:3000/subjects/${this.editedSubject.id}`, this.editedSubject)
        .then(response => {
          console.log('Update response:', response.data);
          const index = this.subjects.findIndex(subject => subject.id === this.editedSubject.id);
            this.subjects.splice(index, 1, response.data);
            this.cancelEdit();
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de la classe :', error);
        });
    },
  
    deleteSubject(id) {
      // Méthode pour supprimer une matière
      axios.delete(`http://localhost:3000/subjects/${id}`)
        .then(() => {
          this.subjects = this.subjects.filter(subject => subject.id !== id);
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de la matière :', error);
        });
    },
    cancelEdit() {
      // Méthode pour annuler l'édition
      this.editMode = false;
      this.editedSubject = { id: '', name: '', class_id: '', teacher_id: '' };
    },
    getClassById(classId) {
      // Méthode pour récupérer le nom de la classe par son ID
      return this.classes.find(cls => cls.id === classId) || { name: 'Non défini' };
    },
    getTeacherById(teacherId) {
      // Méthode pour récupérer le nom de l'enseignant par son ID
      return this.teachers.find(teacher => teacher.id === teacherId) || { name: 'Non défini' };
    }
  },
  mounted() {
    // Chargement des données à l'initialisation du composant
    this.fetchSubjects();
    this.fetchClasses();
    this.fetchTeachers();
  }
};
</script>

<style scoped>
.subjects-page {
  padding: 20px;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
 padding-right: 20px;
}

.form-popup {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 20px;
}

.form-popup label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-popup input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-popup button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.form-popup button[type="button"] {
  background-color: #f44336;
}

.subject-list table {
  width: 100%;
  border-collapse: collapse;
}

.subject-list th{
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.subject-list td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.edit-button, .delete-button {
  background-color: #008CBA;
  color: white;
  padding: 5px 20px;
  
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.delete-button {
  background-color: #f44336;
}

.edit-button {
  margin-right: 10px;
}
</style>
