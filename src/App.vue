<template>
  <div id="app">
    <!-- Sidebar -->
    <aside>
      <div class="sidebar">
        <!-- Logo -->
        <div class="sidebar-logo">
          <img src="/logo.png" alt="BethanySchool" />
        </div>

        <!-- Menu Items -->
        <router-link to="/" class="sidebar-item">
          <font-awesome-icon icon="home" />
          <span>Taleau de bord</span>z
        </router-link>
        <router-link to="/students" class="sidebar-item">
          <font-awesome-icon icon="user-graduate" />
          <span>Élève</span>
        </router-link>
        <router-link to="/teachers" class="sidebar-item">
          <font-awesome-icon icon="chalkboard-teacher" />
          <span>Enseignant</span>
        </router-link>
        <router-link to="/classes" class="sidebar-item">
          <font-awesome-icon icon="school" />
          <span>Classe</span>
        </router-link>
        <router-link to="/subjects" class="sidebar-item">
          <font-awesome-icon icon="book-open" />
          <span>Matiere</span>
        </router-link>
        <router-link to="/timetable" class="sidebar-item">
          <font-awesome-icon icon="calendar-alt" />
          <span>Calendrier</span>
        </router-link>
         
        <router-link to="/results" class="sidebar-item">
          <font-awesome-icon icon="poll" />
          <span>Resultat</span>
        </router-link>
        <router-link to="/notifications" class="sidebar-item">
          <font-awesome-icon icon="bell" />
          <span>Notifications</span>
        </router-link>
        <router-link to="/parent-portal" class="sidebar-item">
          <font-awesome-icon icon="users" />
          <span>Parents élèves</span>
        </router-link>
 
      </div>
    </aside>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  background: #f4f6fb;
}
#app {
  display: flex;
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  background: #f4f6fb;
  min-height: 100vh;
}

aside {
  width: 250px;
  background: linear-gradient(135deg, #1976d2 60%, #42a5f5 100%);
  color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  box-shadow: 2px 0 12px rgba(25, 118, 210, 0.08);
  z-index: 10;
}

.sidebar {
  padding-top: 32px;
}

.sidebar-logo {
  text-align: center;
  margin-bottom: 32px;
}

.sidebar-logo img {
  max-width: 70%;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 14px 28px;
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  border-radius: 0 24px 24px 0;
  margin-bottom: 6px;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;
}

.sidebar-item svg {
  margin-right: 14px;
  font-size: 22px;
}

.sidebar-item.router-link-exact-active,
.sidebar-item:hover {
  background: rgba(255,255,255,0.18);
  color: #ffe082;
}

main {
  margin-left: 250px;
  padding: 36px 24px 24px 24px;
  flex: 1;
  min-height: 100vh;
  background: #f4f6fb;
  box-shadow: none;
  border-radius: 0;
}
</style>
 