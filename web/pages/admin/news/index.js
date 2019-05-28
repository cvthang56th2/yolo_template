import PopupDetail from '@/components/admin/news/popup/popup.detail.vue'
import NewsService from '@/components/admin/news/services.js'

export default {
  components: {
    PopupDetail
  },

  data() {
    return {
      search: '',
      pagination: {},
      selected: [],
      showPopupDetail: false,
      news: [],
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Description', value: 'description' },
        { text: 'Created At', value: 'createdAt' }
      ],
      selectedNewsId: null
    }
  },
  computed: {
    pages() {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  watch: {
    showPopupDetail (v) {
      if (!v) {
        this.selectedNewsId = null
      }
    }
  },

  methods: {
    async fetchData () {
      try {
        const { data } = await NewsService.getItems()
        this.news = (data && data.data) || []
      } catch (error) {
        console.log(error)
      }
    },
    editNews (newsId) {
      this.showPopupDetail = true
      this.selectedNewsId = newsId
    },
    async removeNews (newsId) {
      try {
        await NewsService.remove(newsId)
        this.fetchData()
      } catch (error) {
        console.log(error)
      }
    }
  },

  created () {
    this.fetchData()
  }
}
