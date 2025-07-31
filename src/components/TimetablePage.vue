<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card elevation="2">
          <v-card-title class="headline">Emploi du temps</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Jour</th>
                  <th>Matière</th>
                  <th>Heure</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in timetable" :key="item.id">
                  <td>{{ item.day }}</td>
                  <td>{{ item.subject }}</td>
                  <td>{{ item.time }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TimetablePage',
  data() {
    return {
      timetable: [
        { id: 1, day: 'Lundi', subject: 'Maths', time: '08:00 - 09:00' },
        { id: 2, day: 'Lundi', subject: 'Français', time: '09:00 - 10:00' },
        { id: 3, day: 'Mardi', subject: 'Histoire', time: '10:00 - 11:00' },
      ],
    }
  },
}
</script>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.custom-calendar {
  width: 80%; /* Ajustez la largeur selon votre mise en page */
  max-width: 800px; /* Limitez la largeur maximale du calendrier */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.vue-cal-header {
  background-color: #007bff; /* Couleur de fond de l'en-tête */
  color: #ffffff; /* Couleur du texte de l'en-tête */
  border-radius: 8px 8px 0 0; /* Coins arrondis seulement en haut */
}

.vue-cal-event {
  background-color: #f8f9fa; /* Couleur de fond des événements */
  color: #495057; /* Couleur du texte des événements */
  border: 1px solid #ced4da; /* Bordure autour des événements */
  border-radius: 4px;
}

.vue-cal-event:hover {
  background-color: #e9ecef; /* Couleur de fond au survol des événements */
}

.vue-cal-event-title {
  font-weight: bold; /* Texte en gras pour les titres d'événements */
}

.vue-cal-event-description {
  font-size: 14px; /* Taille de police pour la description des événements */
}
</style>
