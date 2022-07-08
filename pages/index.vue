<template>
  <div class="container">
    <div>
      <input v-model="searchQuery" type="text" />
      <label for="pageSize">Page Size: </label>
      <select id="pageSize" v-model="pagination.pageSize" name="pageSize">
        <option v-for="item in itemsPerPage" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <label for="itemStatus">Status </label>

      <select id="itemStatus" v-model="completedFilter" name="pageSize">
        <option value="null">all</option>
        <option :value="true">Completed</option>
        <option :value="false">Not completed</option>
      </select>
    </div>

    <todo-list :items-list="paginatedList"></todo-list>
    <the-pagination
      v-bind="pagination"
      :total-pages="totalPages"
      :page-changed="handlePageChanged"
      :content-class="'pagination-wrapper'"
    ></the-pagination>
  </div>
</template>

<script>
import ThePagination from '~/components/ThePagination.vue'
import TodoList from '~/components/TodoList.vue'
export default {
  name: 'IndexPage',
  components: { ThePagination, TodoList },
  async asyncData({ error }) {
    const todoList = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then((result) => result.json())
      .catch((err) => {
        error(err)
      })
    return { todoList }
  },
  data() {
    return {
      todoList: [],
      searchQuery: '',
      itemsPerPage: [5, 10, 20],
      completedFilter: null,
      pagination: {
        currentPage: 1,
        maxVisibleButtons: 3,
        pageSize: 5,
      },
    }
  },

  computed: {
    filteredList() {
      return this.todoList.filter((todo) => {
        // this could be separated to different methods or reworked to be more readable
        // if completed filter selected do filter with it
        if (this.completedFilter !== null) {
          return (
            todo.title.includes(this.searchQuery) &&
            todo.completed === this.completedFilter
          )
        }
        // if not do with search
        return todo.title.includes(this.searchQuery.trim())
      })
    },
    paginatedList() {
      const offset = this.pagination.currentPage - 1
      const start = offset * this.pagination.pageSize
      const end = start + this.pagination.pageSize
      return this.filteredList.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredList.length / this.pagination.pageSize)
    },
  },
  methods: {
    handlePageChanged(page) {
      this.pagination.currentPage = page
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 90px;
  .pagination-wrapper:deep {
    margin: 0 auto;
  }
}
</style>
