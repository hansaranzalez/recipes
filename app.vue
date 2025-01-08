<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore, AuthForms } from './store/authStore';
const { isAuthenticated, selectedFormGetter } = storeToRefs(useAuthStore());
</script>

<template>
  <section>
    <NuxtPage />
  </section>
  <UNotifications />
</template>
