import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../components/HomePage.vue';
import StudentListPage from '../components/StudentListPage.vue';
import TeacherListPage from '../components/TeacherListPage.vue';
import ClassListPage from '../components/ClassListPage.vue';
import SubjectListPage from '../components/SubjectListPage.vue';
import TimetablePage from '../components/TimetablePage.vue';
import ResultsPage from '../components/ResultsPage.vue';
import NotificationsPage from '../components/NotificationsPage.vue';
import ParentPortalPage from '../components/ParentPortalPage.vue';


const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/students', name: 'StudentListPage', component: StudentListPage },
  { path: '/teachers', name: 'TeacherListPage', component: TeacherListPage },
  { path: '/classes', name: 'ClassListPage', component: ClassListPage },
  { path: '/subjects', name: 'SubjectListPage', component: SubjectListPage },
  { path: '/timetable', name: 'TimetablePage', component: TimetablePage },
  { path: '/results', name: 'ResultsPage', component: ResultsPage },
  { path: '/notifications', name: 'NotificationsPage', component: NotificationsPage },
  { path: '/parent-portal', name: 'ParentPortalPage', component: ParentPortalPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
