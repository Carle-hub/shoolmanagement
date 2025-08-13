<template> 
  <div class="student-list-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1>
          <i class="fas fa-graduation-cap"></i>
          Liste des étudiants
        </h1>
        <button class="add-button" @click="showForm = true; editMode = false">
          <i class="fas fa-plus"></i>
          Ajouter un étudiant
        </button>
      </div>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div v-if="showForm" class="form-overlay">
      <div class="add-student-form">
        <div class="form-header">
          <h2 v-if="!editMode">
            <i class="fas fa-user-plus"></i>
            Ajouter un nouvel étudiant
          </h2>
          <h2 v-else>
            <i class="fas fa-user-edit"></i>
            Modifier l'étudiant {{ editedStudent.name }}
          </h2>
          <button class="close-button" @click="cancelEdit">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="form-content">
          <div class="form-row">
            <div class="form-group">
              <label for="name">
                <i class="fas fa-user"></i>
                Nom et Prénom
              </label>
              <input id="name" type="text" v-model="editedStudent.name" required>
            </div>

            <div class="form-group">
              <label for="class">
                <i class="fas fa-chalkboard"></i>
                Classe
              </label>
              <input id="class" type="text" v-model="editedStudent.class" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="section">
                <i class="fas fa-layer-group"></i>
                Section
              </label>
              <input id="section" type="text" v-model="editedStudent.section" required>
            </div>

            <div class="form-group">
              <label for="dob">
                <i class="fas fa-calendar-alt"></i>
                Date de naissance
              </label>
              <input id="dob" type="date" v-model="editedStudent.dob" required>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="address">
              <i class="fas fa-map-marker-alt"></i>
              Adresse
            </label>
            <input id="address" type="text" v-model="editedStudent.address" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Email
              </label>
              <input id="email" type="email" v-model="editedStudent.email" required>
            </div>

            <div class="form-group">
              <label for="phone">
                <i class="fas fa-phone"></i>
                Téléphone
              </label>
              <input id="phone" type="text" v-model="editedStudent.phone" required>
            </div>
          </div>

          <div class="form-buttons">
            <button type="submit" class="submit-button" v-if="!editMode">
              <i class="fas fa-save"></i>
              Ajouter
            </button>
            <button type="button" class="submit-button" v-else @click="updateStudent">
              <i class="fas fa-save"></i>
              Modifier
            </button>
            <button type="button" class="cancel-button" @click="cancelEdit">
              <i class="fas fa-times"></i>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tableau des étudiants -->
    <div v-else class="table-container">
      <div class="table-header">
        <div class="table-info">
          <span class="student-count">{{ students.length }} étudiant(s)</span>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="student-table">
          <thead>
            <tr>
              <th>
                <i class="fas fa-user"></i>
                Nom et Prénom
              </th>
              <th>
                <i class="fas fa-chalkboard"></i>
                Classe
              </th>
              <th>
                <i class="fas fa-layer-group"></i>
                Section
              </th>
              <th>
                <i class="fas fa-calendar-alt"></i>
                Date de naissance
              </th>
              <th>
                <i class="fas fa-map-marker-alt"></i>
                Adresse
              </th>
              <th>
                <i class="fas fa-envelope"></i>
                Email
              </th>
              <th>
                <i class="fas fa-phone"></i>
                Téléphone
              </th>
              <th class="actions-header">
                <i class="fas fa-cogs"></i>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id" class="student-row">
              <td class="name-cell">
                <div class="student-avatar">
                  {{ getInitials(student.name) }}
                </div>
                <span class="student-name">{{ student.name }}</span>
              </td>
              <td>
                <span class="class-badge">{{ student.class }}</span>
              </td>
              <td>{{ student.section }}</td>
              <td>{{ formatDate(student.dob) }}</td>
              <td class="address-cell">{{ student.address }}</td>
              <td>
                <a :href="'mailto:' + student.email" class="email-link">
                  {{ student.email }}
                </a>
              </td>
              <td>
                <a :href="'tel:' + student.phone" class="phone-link">
                  {{ student.phone }}
                </a>
              </td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <button 
                    class="action-btn edit-btn" 
                    @click="editStudent(student)"
                    title="Modifier l'étudiant"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    @click="deleteStudent(student.id)"
                    title="Supprimer l'étudiant"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Message si aucun étudiant -->
      <div v-if="students.length === 0" class="empty-state">
        <i class="fas fa-users"></i>
        <h3>Aucun étudiant trouvé</h3>
        <p>Commencez par ajouter votre premier étudiant</p>
        <button class="add-button" @click="showForm = true; editMode = false">
          <i class="fas fa-plus"></i>
          Ajouter un étudiant
        </button>
      </div>
    </div>
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
      this.editedStudent = { ...student };
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
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        axios.delete(`http://localhost:3000/students/${studentId}`)
          .then(() => {
            this.fetchStudents();
          })
          .catch(error => {
            console.error('Erreur lors de la suppression de l\'étudiant :', error);
          });
      }
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
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    getInitials(name) {
      return name.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
  },
  mounted() {
    this.fetchStudents();
  }
};
</script>

<style scoped>/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.student-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: white;
  min-height: 100vh;
}

/* Header Styles */
.header {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 30px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: #1a202c;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h1 i {
  color: #4a5568;
}

.add-button {
  background: #3182ce;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
  background: #2c5282;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Form Overlay */
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.add-student-form {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.form-header {
  background: #2d3748;
  color: white;
  padding: 20px 30px;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-header h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.form-content {
  padding: 30px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
  margin-bottom: 20px;
}

.form-group label {
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.form-group label i {
  color: #718096;
  width: 14px;
  font-size: 0.8rem;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background: #fafafa;
}

.form-group input:focus {
  outline: none;
  border-color: #3182ce;
  background: white;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.1);
}

.form-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.submit-button {
  background: #38a169;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.submit-button:hover {
  background: #2f855a;
  transform: translateY(-1px);
}

.cancel-button {
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background: #d1d5db;
}

/* Table Styles */
.table-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table-header {
  background: #f8fafc;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.table-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.student-count {
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
}

.table-wrapper {
  overflow-x: auto;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.student-table th {
  background: #2d3748;
  color: white;
  padding: 14px 12px;
  text-align: left;
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.student-table th i {
  margin-right: 6px;
  opacity: 0.8;
  font-size: 0.8rem;
}

.student-table td {
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.student-row {
  transition: all 0.2s ease;
}

.student-row:hover {
  background: #f8fafc;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.student-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #4a5568;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.student-name {
  font-weight: 500;
  color: #1a202c;
}

.class-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}

.email-link, .phone-link {
  color: #3182ce;
  text-decoration: none;
  transition: all 0.2s ease;
}

.email-link:hover, .phone-link:hover {
  color: #2c5282;
  text-decoration: underline;
}

.address-cell {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions-header {
  text-align: center;
  width: 100px;
}

.actions-cell {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.action-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.edit-btn {
  background: #3182ce;
  color: white;
}

.edit-btn:hover {
  background: #2c5282;
  transform: translateY(-1px);
}

.delete-btn {
  background: #e53e3e;
  color: white;
}

.delete-btn:hover {
  background: #c53030;
  transform: translateY(-1px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 50px 20px;
  color: #718096;
}

.empty-state i {
  font-size: 3rem;
  color: #cbd5e0;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
}

.empty-state p {
  font-size: 0.95rem;
  margin-bottom: 24px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .student-list-container {
    padding: 12px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-buttons {
    flex-direction: column;
  }
  
  .table-wrapper {
    overflow-x: scroll;
  }
  
  .student-table {
    min-width: 700px;
  }
}

@media (max-width: 480px) {
  .add-student-form {
    width: 95%;
    margin: 16px;
  }
  
  .form-content {
    padding: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
}
</style>