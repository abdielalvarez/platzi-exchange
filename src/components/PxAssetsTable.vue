<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in assets"
        :key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            alt="a.name"
            class="w-6 h-6"
          />
        </td>
        <td>
          <b>#{{ asset.rank }}</b>
        </td>
        <td>
          <!-- Puedes hacerlo de la manera tradicional pasando to="/coin/${asset.id}" -->
          <!-- Pero si cambias el nombre de la ruta en router.js tendrás que cambiarlo aquí tambien -->
          <!-- Si lo haces así, aunque cambies router.js aquí no deberás hacer nada -->
          <router-link
            :to="{ name: 'coin-detail', params: { id: asset.id } }"
            class="mt-5 text-xl text-green-600 hover:underline"
          >
            {{ asset.name }}
            <small class="ml-1 text-gray-500">
              {{ asset.symbol }}
            </small>
          </router-link>
        </td>
        <td>
          {{ dollarFilter(asset.priceUsd) }}
        </td>
        <td>
          {{ dollarFilter(asset.marketCapUsd) }}
        </td>
        <td
          :class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ percentFilter(asset.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dollarFilter, percentFilter } from '@/filters'
import PxButton from '@/components/PxButton'

export default {
  name: 'PxAssetsTable',
  components: { PxButton },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      dollarFilter,
      percentFilter
    }
  },
  methods: {
    goToCoin (id) {
      console.log('id', id);
      // NO CONFUNDIR con this.route, this.router es la instancia de vue-router
      // y por el puedes utilizar los métodos de vue-router principalmente para navegar
      this.$router.push({ name: 'coin-detail', params: { id } })
    }
  }
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
