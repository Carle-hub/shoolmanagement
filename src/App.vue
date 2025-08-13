<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      app
      permanent
      clipped
      width="280"
      class="sidebar"
    >
      <!-- Logo -->
      <v-list-item class="px-4 logo-section">
        <v-img
          src="/logo.png"
          max-width="120"
          contain
          aspect-ratio="1"
          class="mx-auto my-4"
        ></v-img>
      </v-list-item>
      
      <!-- Menu -->
      <v-divider class="sidebar-divider"></v-divider>
      <v-list nav class="menu-list">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
          class="menu-item"
        >
          <!-- Icône à gauche -->
          <template v-slot:prepend>
            <div class="icon-wrapper">
              <font-awesome-icon 
                :icon="item.icon" 
                fixed-width 
                class="sidebar-fa-icon" 
              />
            </div>
          </template>
          
          <!-- Texte à droite -->
          <v-list-item-title class="sidebar-title">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt,
  faUserGraduate,
  faChalkboardTeacher,
  faBuilding,
  faBookOpen,
  faCalendarAlt,
  faPoll,
  faBell,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

// Ajout des icônes à la bibliothèque
library.add(
  faTachometerAlt,
  faUserGraduate,
  faChalkboardTeacher,
  faBuilding,
  faBookOpen,
  faCalendarAlt,
  faPoll,
  faBell,
  faUsers
);

export default {
  name: 'SidebarLayout',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      menuItems: [
        { title: 'Tableau de bord', icon: ['fas', 'tachometer-alt'], to: '/' },
        { title: 'Élèves', icon: ['fas', 'user-graduate'], to: '/students' },
        { title: 'Enseignants', icon: ['fas', 'chalkboard-teacher'], to: '/teachers' },
        { title: 'Classes', icon: ['fas', 'building'], to: '/classes' },
        { title: 'Matières', icon: ['fas', 'book-open'], to: '/subjects' },
        { title: 'Calendrier', icon: ['fas', 'calendar-alt'], to: '/timetable' },
        { title: 'Résultats', icon: ['fas', 'poll'], to: '/results' },
        { title: 'Notifications', icon: ['fas', 'bell'], to: '/notifications' },
        { title: 'Parents', icon: ['fas', 'users'], to: '/parent-portal' }
      ]
    };
  }
};
</script>

<style scoped>
/* Police optionnelle - à ajouter globalement si désiré */
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'); */

/* Sidebar principale */
.sidebar {
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  border-right: 1px solid #34495e;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
}

/* Section logo */
.logo-section {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Divider du menu */
.sidebar-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 0 16px;
}

/* Liste du menu */
.menu-list {
  padding: 20px 16px;
}

/* Items du menu */
.menu-item {
  display: flex !important;
  align-items: center !important;
  margin: 8px 0;
  padding: 14px 16px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 56px;
  position: relative;
  overflow: hidden;
}

/* Effet hover */
.menu-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(6px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* État actif */
.v-list-item--active {
  background: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.v-list-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 32px;
  background: #3498db;
  border-radius: 0 4px 4px 0;
}

/* Wrapper d'icône */
.icon-wrapper {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 12px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.menu-item:hover .icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Icône FontAwesome */
.sidebar-fa-icon {
  font-size: 20px;
  color: #ecf0f1;
  transition: color 0.3s ease;
}

.menu-item:hover .sidebar-fa-icon {
  color: #ffffff;
}

/* Titre du menu */
.sidebar-title {
  font-size: 16px;
  font-weight: 500;
  color: #ecf0f1;
  line-height: 1.2;
  transition: color 0.3s ease;
  margin: 0;
  flex: 1;
}

.menu-item:hover .sidebar-title {
  color: #ffffff;
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 960px) {
  .sidebar {
    width: 260px !important;
  }
  
  .menu-item {
    padding: 12px 14px;
  }
  
  .sidebar-title {
    font-size: 15px;
  }
}

/* Animation d'entrée */
.menu-item {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Stagger animation pour les items */
.menu-item:nth-child(1) { animation-delay: 0.1s; }
.menu-item:nth-child(2) { animation-delay: 0.2s; }
.menu-item:nth-child(3) { animation-delay: 0.3s; }
.menu-item:nth-child(4) { animation-delay: 0.4s; }
.menu-item:nth-child(5) { animation-delay: 0.5s; }
.menu-item:nth-child(6) { animation-delay: 0.6s; }
.menu-item:nth-child(7) { animation-delay: 0.7s; }
.menu-item:nth-child(8) { animation-delay: 0.8s; }
.menu-item:nth-child(9) { animation-delay: 0.9s; }
</style>