<script lang="ts" setup>
import GGrid from "@/components/grid/GGrid.vue";
import usersData from "@/api/users";
import "@/assets/scss/style.scss";

const columns = [
  {
    title: "first name",
    field: "first_name"
  },
  {
    title: "permission",
    field: "permission",
    columnClassName: "class1",
    rowClassName: "class2",
    width: 50
  },
  {
    title: "age",
    field: "age"
  },
  {
    title: "gender",
    field: "gender"
  }
];

const { rows } = usersData;
</script>

<template>
  <g-grid :columns="columns" :rows="rows" />
</template>
