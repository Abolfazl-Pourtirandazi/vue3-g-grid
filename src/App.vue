<script lang="ts" setup>
import GGrid from "@/components/grid/GGrid.vue";
import usersData from "@/api/users";

const { columns, rows } = usersData;
</script>

<template>
  <g-grid :columns="columns" :rows="rows" />
</template>
