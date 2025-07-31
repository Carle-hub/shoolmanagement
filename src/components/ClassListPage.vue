<template>
  <div class="class-page">
    <h1>Gestion des Classes</h1>
    <button class="add-button" @click="showAddClassForm = true">Ajouter une Classe</button>

    <div v-if="showAddClassForm" class="form-popup">
      <form @submit.prevent="addClass">
        <h2>Ajouter une Nouvelle Classe</h2>
        <label for="className">Nom de la Classe:</label>
        <input type="text" id="className" v-model="newClass.name" required>

        <label for="section">Section:</label>
        <input type="text" id="section" v-model="newClass.section" required>

        <button type="submit">Ajouter</button>
        <button type="button" @click="showAddClassForm = false">Annuler</button>
      </form>
    </div>

    <div v-if="editMode" class="form-popup">
      <form @submit.prevent="updateClass">
        <h2>Modifier la Classe</h2>
        <label for="editClassName">Nom de la Classe:</label>
        <input type="text" id="editClassName" v-model="editedClass.name" required>

        <label for="editSection">Section:</label>
        <input type="text" id="editSection" v-model="editedClass.section" required>

        <button type="submit">Mettre à jour</button>
        <button type="button" @click="cancelEdit">Annuler</button>
      </form>
    </div>

    <div class="class-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la Classe</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classe in classes" :key="classe.id">
            <td>{{ classe.id }}</td>
            <td>{{ classe.name }}</td>
            <td>{{ classe.section }}</td>
            <td>
              <button class="edit-button" @click="editClass(classe)">Modifier</button>
              <button class="delete-button" @click="deleteClass(classe.id)">Supprimer</button>
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
      showAddClassForm: false,
      editMode: false,
      newClass: {
        name: '',
        section: ''
      },
      editedClass: {
        id: '',
        name: '',
        section: ''
      },
      classes: []
    };
  },
  methods: {
    fetchClasses() {
      axios.get('http://localhost:3000/classes')
        .then(response => {
          this.classes = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des classes :', error);
        });
    },
    addClass() {
      axios.post('http://localhost:3000/classes', this.newClass)
        .then(response => {
          this.classes.push(response.data);
          this.newClass = { name: '', section: '' };
          this.showAddClassForm = false;
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la classe :', error);
        });
    },
    editClass(classe) {
      this.editedClass = { ...classe };
      this.editMode = true;
      this.showForm = true;
    },
    updateClass() {
      axios.put(`http://localhost:3000/classes/${this.editedClass.id}`, this.editedClass)
        .then(response => {
          const index = this.classes.findIndex(classe => classe.id === this.editedClass.id);
          this.classes.splice(index, 1, response.data);
          this.cancelEdit();
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de la classe :', error);
        });
    },
    deleteClass(id) {
      axios.delete(`http://localhost:3000/classes/${id}`)
        .then(() => {
          this.classes = this.classes.filter(classe => classe.id !== id);
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de la classe :', error);
        });
    },
    cancelEdit() {
      this.editMode = false;
      this.editedClass = { id: '', name: '', section: '' };
    }
  },
  mounted() {
    this.fetchClasses();
  }
};
</script>

<style scoped>
.class-page {
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

.class-list table {
  width: 100%;
  border-collapse: collapse;
}

.class-list th {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.class-list td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.edit-button, .delete-button {
  background-color: #008CBA;
  color: white;
  padding: 5px 10px;
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
