<template>
  <div :class="contentClass">
    <ul class="pagination">
      <li class="pagination-item">
        <button
          type="button"
          :disabled="isInFirstPage"
          @click="onClickFirstPage"
        >
          First
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          :disabled="isInFirstPage"
          @click="onClickPreviousPage"
        >
          Previous
        </button>
      </li>

      <!-- Visible Buttons Start -->

      <li v-for="page in pages" :key="page.name" class="pagination-item">
        <button
          type="button"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
          @click="onClickPage(page.name)"
        >
          {{ page.name }}
        </button>
      </li>

      <!-- Visible Buttons End -->

      <li class="pagination-item">
        <button type="button" :disabled="isInLastPage" @click="onClickNextPage">
          Next
        </button>
      </li>

      <li class="pagination-item">
        <button type="button" :disabled="isInLastPage" @click="onClickLastPage">
          Last
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      default: 3,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    contentClass: {
      type: String,
      default: '',
    },
    // pageSize: {
    //   type: Number,
    //   default: 5,
    // },
    currentPage: {
      type: Number,
      required: true,
    },
    pageChanged: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        const start = this.totalPages - (this.maxVisibleButtons - 1)

        if (start === 0) {
          return 1
        } else {
          return start
        }
      }

      // When inbetween
      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickFirstPage() {
      this.pageChanged(1)
    },
    onClickPreviousPage() {
      this.pageChanged(this.currentPage - 1)
    },
    onClickPage(page) {
      console.log('page: ', page)
      this.pageChanged(page)
    },
    onClickNextPage() {
      this.pageChanged(this.currentPage + 1)
    },
    onClickLastPage() {
      this.pageChanged(this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 10px;
  width: fit-content;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
