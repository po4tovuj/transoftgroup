<template>
  <div>
    <h1 class="list-title">
      {{ title }}
    </h1>
    <table class="table">
      <thead class="table-header">
        <tr class="header-row">
          <th class="header-row__item">Title</th>
          <th class="header-row__item">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="todo in itemsList" :key="todo.id" class="body-row">
          <td class="body-row__item">{{ todo.title }}</td>
          <td class="body-row__item">
            {{ todo.completed ? 'Completed' : 'Not completed' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    title: {
      type: String,
      default: 'This is a list',
    },
    itemsList: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin-bottom: 30px;
  min-height: 220px;
}
.table-header {
  .header-row {
    &__item {
      text-align: inherit;
      font-size: 30px;
      padding: 5px 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
.table-body {
  .body-row {
    &__item {
      font-size: 20px;
      padding: 5px 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
