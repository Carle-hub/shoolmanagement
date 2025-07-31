<template>
  <div class="teacher-list-container">
    <div class="header">
      <h1>Liste des enseignants</h1>
      <button class="add-button" @click="showForm = true; editMode = false">Ajouter Enseignant</button>
    </div>

    <div v-if="showForm" class="add-teacher-form">
      <h2 v-if="!editMode">Ajouter un nouvel enseignant</h2>
      <h2 v-else>Modifier l'enseignant {{ editedTeacher.name }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nom :</label>
          <input id="name" type="text" v-model="editedTeacher.name" required>
        </div>

        <div class="form-group">
          <label for="subject">Matière :</label>
          <input id="subject" type="text" v-model="editedTeacher.subject" required>
        </div>

        <div class="form-group">
          <label for="email">Email :</label>
          <input id="email" type="email" v-model="editedTeacher.email" required>
        </div>

        <div class="form-group">
          <label for="phone">Téléphone :</label>
          <input id="phone" type="text" v-model="editedTeacher.phone" required>
        </div>

        <div class="form-buttons">
          <button type="submit" v-if="!editMode">Ajouter</button>
          <button type="button" v-else @click="updateTeacher">Modifier</button>
          <button type="button" @click="cancelEdit">Annuler</button>
        </div>
      </form>
    </div>

    <table v-else class="teacher-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Matière</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <td>{{ teacher.name }}</td>
          <td>{{ teacher.subject }}</td>
          <td>{{ teacher.email }}</td>
          <td>{{ teacher.phone }}</td>
          <td>
            <button class="edit-button" @click="editTeacher(teacher)">Modifier</button>
            <button class="delete-button" @click="deleteTeacher(teacher.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import './TeacherListPage.css';

export default {
  name: 'TeacherList',
  data() {
    return {
      showForm: false,
      editMode: false,
      teachers: [],
      editedTeacher: {
        id: null,
        name: '',
        subject: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    fetchTeachers() {
      axios.get('http://localhost:3000/teachers')
        .then(response => {
          this.teachers = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des enseignants :', error);
        });
    },
    handleSubmit() {
      if (this.editMode) {
        this.updateTeacher();
      } else {
        axios.post('http://localhost:3000/teachers', this.editedTeacher)
          .then(() => {
            this.fetchTeachers();
            this.cancelEdit();
          })
          .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'enseignant :', error);
          });
      }
    },
    editTeacher(teacher) {
      this.editedTeacher = { ...teacher };
      this.editMode = true;
      this.showForm = true;
    },
    updateTeacher() {
      axios.put(`http://localhost:3000/teachers/${this.editedTeacher.id}`, this.editedTeacher)
        .then(() => {
          this.fetchTeachers();
          this.cancelEdit();
        })
        .catch(error => {
          console.error('Erreur lors de la modification de l\'enseignant :', error);
        });
    },
    deleteTeacher(teacherId) {
      axios.delete(`http://localhost:3000/teachers/${teacherId}`)
        .then(() => {
          this.fetchTeachers();
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de l\'enseignant :', error);
        });
    },
    cancelEdit() {
      this.editedTeacher = {
        id: null,
        name: '',
        subject: '',
        email: '',
        phone: ''
      };
      this.editMode = false;
      this.showForm = false;
    }
  },
  mounted() {
    this.fetchTeachers();
  }
};
</script>

 