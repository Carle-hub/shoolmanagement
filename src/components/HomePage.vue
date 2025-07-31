<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center" style="background: #f4f6fb;">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-img src="../assets/logo.png" max-width="140" class="mx-auto mb-4" style="border-radius: 16px; box-shadow: 0 2px 12px rgba(25,118,210,0.08);" />
        <h1 class="mb-2 font-weight-bold" style="color: #1976d2;">Bienvenue sur le portail de gestion scolaire</h1>
        <p class="mb-6" style="color: #607d8b; font-size: 1.15rem;">Gérez facilement les élèves, enseignants, classes et plus encore.</p>
        <v-row class="justify-center mb-8">
          <v-col cols="12" md="3">
            <v-card color="#e3f2fd" class="pa-4" elevation="2">
              <div class="d-flex align-center">
                <v-icon color="primary" size="36">mdi-account-group</v-icon>
                <div class="ml-4">
                  <div class="font-weight-bold" style="font-size: 1.2rem; color: #1976d2;">Élèves</div>
                  <div style="font-size: 1.5rem; color: #263238;">1500</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card color="#fff3e0" class="pa-4" elevation="2">
              <div class="d-flex align-center">
                <v-icon color="deep-orange" size="36">mdi-teach</v-icon>
                <div class="ml-4">
                  <div class="font-weight-bold" style="font-size: 1.2rem; color: #ff9800;">Enseignants</div>
                  <div style="font-size: 1.5rem; color: #263238;">75</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card color="#e8f5e9" class="pa-4" elevation="2">
              <div class="d-flex align-center">
                <v-icon color="success" size="36">mdi-school</v-icon>
                <div class="ml-4">
                  <div class="font-weight-bold" style="font-size: 1.2rem; color: #43a047;">Classes</div>
                  <div style="font-size: 1.5rem; color: #263238;">35</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card color="#f3e5f5" class="pa-4" elevation="2">
              <div class="d-flex align-center">
                <v-icon color="purple" size="36">mdi-book-open-page-variant</v-icon>
                <div class="ml-4">
                  <div class="font-weight-bold" style="font-size: 1.2rem; color: #8e24aa;">Matières</div>
                  <div style="font-size: 1.5rem; color: #263238;">50</div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-btn color="primary" large to="/students" class="mt-4" style="font-size: 1.1rem;">Voir les élèves</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
 

export default {
   
  name: 'HomePage',
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      // Enregistrer les composants Chart.js nécessaires
      Chart.register(...registerables);

      // Enrollment Chart
      const enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
      new Chart(enrollmentCtx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Enrollments',
            data: [30, 45, 60, 50, 70, 80],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Attendance Chart
      const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
      new Chart(attendanceCtx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Attendance',
            data: [90, 85, 95, 80, 85, 90],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};


