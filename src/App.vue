<script lang="ts" setup>
import usersData from "@/api/users";

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
    width: "50px"
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
