<template>
  <div class="class-list-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1>
          <i class="fas fa-book"></i>
          Gestion des matières
        </h1>
        <button class="add-button" @click="showAddSubjectForm = true; editMode = false">
          <i class="fas fa-plus"></i>
          Ajouter une matière
        </button>
      </div>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div v-if="showAddSubjectForm" class="form-overlay">
      <div class="add-class-form">
        <div class="form-header">
          <h2 v-if="!editMode">
            <i class="fas fa-plus-circle"></i>
            Ajouter une nouvelle matière
          </h2>
          <h2 v-else>
            <i class="fas fa-edit"></i>
            Modifier la matière {{ editedSubject.name }}
          </h2>
          <button class="close-button" @click="cancelEdit">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="editMode ? updateSubject() : addSubject()" class="form-content">
          <div class="form-row">
            <div class="form-group">
              <label for="subjectName">
                <i class="fas fa-book"></i>
                Nom de la matière
              </label>
              <input 
                id="subjectName" 
                type="text" 
                v-model="formSubject.name" 
                required
                placeholder="Ex: Mathématiques, Histoire, etc."
              >
            </div>
            <div class="form-group">
              <label for="classId">
                <i class="fas fa-chalkboard"></i>
                Classe
              </label>
              <select id="classId" v-model="formSubject.class_id" required>
                <option v-for="classe in classes" :key="classe.id" :value="classe.id">{{ classe.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="teacherId">
                <i class="fas fa-user"></i>
                Enseignant
              </label>
              <select id="teacherId" v-model="formSubject.teacher_id" required>
                <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-buttons">
            <button type="submit" class="submit-button" v-if="!editMode">
              <i class="fas fa-save"></i>
              Ajouter
            </button>
            <button type="submit" class="submit-button" v-else>
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

    <!-- Tableau des matières -->
    <div v-else class="table-container">
      <div class="table-header">
        <div class="table-info">
          <span class="class-count">{{ subjects.length }} matière(s)</span>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="class-table">
          <thead>
            <tr>
              <th><i class="fas fa-hashtag"></i> ID</th>
              <th><i class="fas fa-book"></i> Nom de la matière</th>
              <th><i class="fas fa-chalkboard"></i> Classe</th>
              <th><i class="fas fa-user"></i> Enseignant</th>
              <th class="actions-header"><i class="fas fa-cogs"></i> Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in subjects" :key="subject.id" class="class-row">
              <td>{{ subject.id }}</td>
              <td>
                <div class="class-info">
                  <span class="class-name">{{ subject.name }}</span>
                </div>
              </td>
              <td>
                <span class="section-badge">{{ getClassById(subject.class_id)?.name }}</span>
              </td>
              <td>
                <span class="student-badge">{{ getTeacherById(subject.teacher_id)?.name }}</span>
              </td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <button 
                    class="action-btn edit-btn" 
                    @click="editSubject(subject)"
                    title="Modifier la matière"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    @click="deleteSubject(subject.id)"
                    title="Supprimer la matière"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Message si aucune matière -->
      <div v-if="subjects.length === 0" class="empty-state">
        <i class="fas fa-book"></i>
        <h3>Aucune matière trouvée</h3>
        <p>Commencez par créer votre première matière</p>
        <button class="add-button" @click="showAddSubjectForm = true; editMode = false">
          <i class="fas fa-plus"></i>
          Ajouter une matière
        </button>
      </div>
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
      editedSubject: { id: '', name: '', class_id: '', teacher_id: '' },
      newSubject: { name: '', class_id: '', teacher_id: '' },
      subjects: [],
      classes: [],
      teachers: []
    };
  },
  computed: {
    formSubject() {
      return this.editMode ? this.editedSubject : this.newSubject;
    }
  },
  mounted() {
    this.fetchSubjects();
    this.fetchClasses();
    this.fetchTeachers();
  },
  methods: {
    fetchSubjects() {
      axios.get('http://localhost:3000/subjects')
        .then(res => this.subjects = res.data)
        .catch(err => console.error(err));
    },
    fetchClasses() {
      axios.get('http://localhost:3000/classes')
        .then(res => this.classes = res.data)
        .catch(err => console.error(err));
    },
    fetchTeachers() {
      axios.get('http://localhost:3000/teachers')
        .then(res => this.teachers = res.data)
        .catch(err => console.error(err));
    },
    addSubject() {
      axios.post('http://localhost:3000/subjects', this.newSubject)
        .then(res => {
          this.subjects.push(res.data);
          this.newSubject = { name: '', class_id: '', teacher_id: '' };
          this.showAddSubjectForm = false;
        })
        .catch(err => console.error(err));
    },
    updateSubject() {
      axios.put(`http://localhost:3000/subjects/${this.editedSubject.id}`, this.editedSubject)
        .then(() => {
          this.fetchSubjects();
          this.showAddSubjectForm = false;
        })
        .catch(err => console.error(err));
    },
    deleteSubject(id) {
      if (confirm("Voulez-vous vraiment supprimer cette matière ?")) {
        axios.delete(`http://localhost:3000/subjects/${id}`)
          .then(() => this.fetchSubjects())
          .catch(err => console.error(err));
      }
    },
    editSubject(subject) {
      this.editMode = true;
      this.editedSubject = { ...subject };
      this.showAddSubjectForm = true;
    },
    cancelEdit() {
      this.editMode = false;
      this.showAddSubjectForm = false;
    },
    getClassById(id) {
      return this.classes.find(c => c.id === id) || {};
    },
    getTeacherById(id) {
      return this.teachers.find(t => t.id === id) || {};
    }
  }
};
</script>
<style scoped>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.class-list-container {
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

.add-class-form {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
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
  padding: 12px 14px;
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

.class-count {
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
}

.table-wrapper {
  overflow-x: auto;
}

.class-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.class-table th {
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

.class-table th i {
  margin-right: 6px;
  opacity: 0.8;
  font-size: 0.8rem;
}

.class-table td {
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.class-row {
  transition: all 0.2s ease;
}

.class-row:hover {
  background: #f8fafc;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.class-avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.class-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.class-name {
  font-weight: 600;
  color: #1a202c;
  font-size: 0.95rem;
}

.class-level {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 400;
}

.student-badge {
  background: #e6fffa;
  color: #38a169;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  border: 1px solid #9ae6b4;
}

.section-badge {
  background: #fef5e7;
  color: #d69e2e;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  border: 1px solid #f6e05e;
}

.actions-header {
  text-align: center;
  width: 120px;
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

.view-btn {
  background: #805ad5;
  color: white;
}

.view-btn:hover {
  background: #6b46c1;
  transform: translateY(-1px);
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
  .class-list-container {
    padding: 12px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .form-buttons {
    flex-direction: column;
  }
  
  .table-wrapper {
    overflow-x: scroll;
  }
  
  .class-table {
    min-width: 600px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
}

@media (max-width: 480px) {
  .add-class-form {
    width: 95%;
    margin: 16px;
  }
  
  .form-content {
    padding: 20px;
  }
}
</style>
