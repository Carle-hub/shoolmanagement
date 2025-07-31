<template> 
  <div class="student-list-container">
    <!-- Header -->
    <div class="header">
      <h1>Liste des étudiants</h1>
      <button class="add-button" @click="showForm = true; editMode = false">Ajouter</button>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div v-if="showForm" class="add-student-form">
      <h2 v-if="!editMode">Ajouter une nouvelle étudiant</h2>
      <h2 v-else>Modifier l'étudiant {{ editedStudent.name }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nom :</label>
          <input id="name" type="text" v-model="editedStudent.name" required>
        </div>

        <div class="form-group">
          <label for="class">Classe :</label>
          <input id="class" type="text" v-model="editedStudent.class" required>
        </div>

        <div class="form-group">
          <label for="section">Section :</label>
          <input id="section" type="text" v-model="editedStudent.section" required>
        </div>

        <div class="form-group">
          <label for="dob">Date de naissance :</label>
          <input id="dob" type="date" v-model="editedStudent.dob" required>
        </div>

        <div class="form-group">
          <label for="address">Adresse :</label>
          <input id="address" type="text" v-model="editedStudent.address" required>
        </div>

        <div class="form-group">
          <label for="email">Email :</label>
          <input id="email" type="email" v-model="editedStudent.email" required>
        </div>

        <div class="form-group">
          <label for="phone">Téléphone :</label>
          <input id="phone" type="text" v-model="editedStudent.phone" required>
        </div>

        <div class="form-buttons">
          <button type="submit" v-if="!editMode">Ajouter</button>
          <button type="button" v-else @click="updateStudent">Modifier</button>
          <button type="button" @click="cancelEdit">Annuler</button>
        </div>
      </form>
    </div>

    <!-- Tableau des étudiants -->
    <table v-else class="student-table">
      <thead>
        <tr>
          <th>Nom et Prenom</th>
          <th>Classe</th>
          <th>Section</th>
          <th>Date de naissance</th>
          <th>Adresse</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.class }}</td>
          <td>{{ student.section }}</td>
          <td>{{ formatDate(student.dob) }}</td>
          <td>{{ student.address }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>
            <button class="edit-button" @click="editStudent(student)">Modifier</button>
            <button class="delete-button" @click="deleteStudent(student.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import './StudentListPage.css';
 

export default {
  name: 'StudentList',
  data() {
    return {
      showForm: false,
      editMode: false,
      students: [],
      editedStudent: {
        id: null,
        name: '',
        class: '',
        section: '',
        dob: '',
        address: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    fetchStudents() {
      axios.get('http://localhost:3000/students')
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des étudiants :', error);
        });
    },
    handleSubmit() {
      if (this.editMode) {
        this.updateStudent();
      } else {
        axios.post('http://localhost:3000/students', this.editedStudent)
          .then(() => {
            this.fetchStudents();
            this.cancelEdit();
          })
          .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'étudiant :', error);
          });
      }
    },
    editStudent(student) {
      this.editedStudent = { ...student }; // Copie les détails de l'étudiant sélectionné
      this.editMode = true;
      this.showForm = true;
    },
    updateStudent() {
      axios.put(`http://localhost:3000/students/${this.editedStudent.id}`, this.editedStudent)
        .then(() => {
          this.fetchStudents();
          this.cancelEdit();
        })
        .catch(error => {
          console.error('Erreur lors de la modification de l\'étudiant :', error);
        });
    },
  deleteStudent(studentId) {
  axios.delete(`http://localhost:3000/students/${studentId}`)
    .then(() => {
      this.deleteStudent();
      this.fetchStudents(); // Rafraîchit la liste après la suppression
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'étudiant :', error);
    });
},


    cancelEdit() {
      this.editedStudent = {
        id: null,
        name: '',
        class: '',
        section: '',
        dob: '',
        address: '',
        email: '',
        phone: ''
      };
      this.editMode = false;
      this.showForm = false;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    this.fetchStudents();
  }
};
</script>