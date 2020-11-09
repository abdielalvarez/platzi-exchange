<template>
  <div>
    <px-assets-table :assets="assets" />
  </div>
</template>

<script>
import api from '@/api'
import PxAssetsTable from '@/components/PxAssetsTable'
export default {
  name: 'Home',
  components: {
    PxAssetsTable
  },
  data() {
    return {
      assets: [],
      error: ''
    }
  },
  created() {
    api.getAssets().then(res => {
      if (res.length) {
        this.assets = res
      } else {
        this.error = res
      }
    })
  }
}
</script>
