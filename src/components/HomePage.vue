<template>
  <v-app>
    <v-main class="custom-background">
      <v-container fluid class="pa-6">
        <!-- Welcome Banner -->
        <v-sheet color="#34495e" dark rounded="lg" elevation="6" class="pa-8 mb-8">
          <v-row align="center">
            <v-col cols="12" md="8">
              <h1 class="text-h3 font-weight-light">Bienvenue sur votre tableau de bord</h1>
              <p class="subtitle-1">
                Consultez rapidement les statistiques clés et accédez à vos modules.
              </p>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-icon size="80">mdi-school</v-icon>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- Stat Cards -->
        <v-row dense>
          <v-col cols="12" sm="6" md="3" v-for="stat in stats" :key="stat.title">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 4"
                :color="stat.color"
                dark
                rounded="lg"
                class="transition-swing pa-4 stat-card"
              >
                <v-card-title class="d-flex justify-space-between align-center">
                  <div>
                    <div class="text-h4 font-weight-bold">{{ stat.value }}</div>
                    <div class="text-subtitle-2">{{ stat.title }}</div>
                  </div>
                  <v-avatar :color="stat.color" size="56">
                    <v-icon size="32">{{ stat.icon }}</v-icon>
                  </v-avatar>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <!-- Quick Actions -->
        <v-divider class="my-8"></v-divider>
        <h2 class="text-h4 mb-4">Actions rapides</h2>
        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="action in actions" :key="action.label">
            <v-btn
              block
              color="#3498db"
              large
              rounded="lg"
              :to="action.to"
              class="action-btn pa-4"
            >
              <v-icon left>{{ action.icon }}</v-icon>
              {{ action.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      stats: [
        { title: 'Élèves', icon: 'mdi-account-group', value: 0, color: '#3498db' },
        { title: 'Enseignants', icon: 'mdi-chalkboard-teacher', value: 0, color: '#2c3e50' },
        { title: 'Classes', icon: 'mdi-domain', value: 0, color: '#34495e' },
        { title: 'Matières', icon: 'mdi-book-open-variant', value: 0, color: '#e67e22' }
      ],
      actions: [
        { label: 'Ajouter un élève', icon: 'mdi-account-plus', to: '/students' },
        { label: 'Voir les enseignants', icon: 'mdi-chalkboard-teacher', to: '/teachers' },
        { label: 'Voir les classes', icon: 'mdi-domain', to: '/classes' },
        { label: 'Gérer les matières', icon: 'mdi-book-open-variant', to: '/subjects' }
      ]
    };
  },
mounted() {
  this.loadStats();
},
methods: {
  async loadStats() {
    try {
      const [studentsRes, teachersRes, classesRes, subjectsRes] = await Promise.all([
        axios.get('http://localhost:3000/students'),
        axios.get('http://localhost:3000/teachers'),
        axios.get('http://localhost:3000/classes'),
        axios.get('http://localhost:3000/subjects')
      ]);
      // Élèves
      if (Array.isArray(studentsRes.data)) {
        this.stats[0].value = studentsRes.data.length;
      } else if (Array.isArray(studentsRes.data.students)) {
        this.stats[0].value = studentsRes.data.students.length;
      } else if (typeof studentsRes.data.count === 'number') {
        this.stats[0].value = studentsRes.data.count;
      } else {
        this.stats[0].value = 0;
      }
      // Enseignants
      if (Array.isArray(teachersRes.data)) {
        this.stats[1].value = teachersRes.data.length;
      } else if (Array.isArray(teachersRes.data.teachers)) {
        this.stats[1].value = teachersRes.data.teachers.length;
      } else if (typeof teachersRes.data.count === 'number') {
        this.stats[1].value = teachersRes.data.count;
      } else {
        this.stats[1].value = 0;
      }
      // Classes
      if (Array.isArray(classesRes.data)) {
        this.stats[2].value = classesRes.data.length;
      } else if (Array.isArray(classesRes.data.classes)) {
        this.stats[2].value = classesRes.data.classes.length;
      } else if (typeof classesRes.data.count === 'number') {
        this.stats[2].value = classesRes.data.count;
      } else {
        this.stats[2].value = 0;
      }
      // Matières
      if (Array.isArray(subjectsRes.data)) {
        this.stats[3].value = subjectsRes.data.length;
      } else if (Array.isArray(subjectsRes.data.subjects)) {
        this.stats[3].value = subjectsRes.data.subjects.length;
      } else if (typeof subjectsRes.data.count === 'number') {
        this.stats[3].value = subjectsRes.data.count;
      } else {
        this.stats[3].value = 0;
      }
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques :', err.response ? err.response.data : err.message);
    }
  }
}
};
</script>

<style scoped>
.custom-background {
  background-color: #ecf0f1;
}

.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.action-btn {
  text-transform: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background-color: #2980b9 !important;
}
</style>
