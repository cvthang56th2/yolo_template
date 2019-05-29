import PopupDetail from '@/components/admin/news/popup/popup.detail.vue'
import NewsService from '@/components/admin/news/services.js'

export default {
  name: 'admin-news',
  layout: 'admin',
  components: {
    PopupDetail
  },

  data() {
    return {
      search: '',
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

  watch: {
    showPopupDetail (v) {
      if (!v) {
        this.selectedNewsId = null
      }
    }
  },

  methods: {
    async fetchData () {
      this.setLoading()
      try {
        const { data } = await NewsService.getItems()
        this.news = (data && data.data) || []
      } catch (error) {
        console.log(error)
      }
      this.setLoading(false)
    },
    editNews (newsId) {
      this.showPopupDetail = true
      this.selectedNewsId = newsId
    },
    async removeNews (newsId) {
      this.setLoading()
      try {
        await NewsService.remove(newsId)
        this.fetchData()
      } catch (error) {
        console.log(error)
      }
      this.setLoading(false)
    }
  },

  created () {
    this.fetchData()
  }
}
