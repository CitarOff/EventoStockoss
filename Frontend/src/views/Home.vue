<template>
  <main>
    <b-card
      header="Liste des evènements"
      header-tag="header"
      style="max-height: 60rem; overflow-x: hidden; overflow-y: auto"
    >
    <b-row>
      <b-col lg="10" class="my-1">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Recherche"
            ></b-form-input>

            <b-input-group-append class="inputGroup">
              <b-button :disabled="!filter" @click="filter = ''">Annuler</b-button>
            </b-input-group-append>

            <b-input-group-append class="inputGroup">
              <b-button @click="refresh()" class="btn btn-primary">Rafraîchir</b-button>
            </b-input-group-append>

            <b-input-group-append class="inputGroup">
              <b-button @click="add()">Ajouter</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table striped hover small :items="events" :fields="header" :busy="isBusy" :filter="filter" responsive="sm">
      <template #table-busy>
          <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(action)="row">
          <b-icon icon="arrow-right-circle-fill" aria-hidden="true" @click="open(row.item.id)" class="mr-2"></b-icon>
      </template>
    </b-table>
    </b-card>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      header: [
        {
          key: 'nom',
          label: 'Nom',
          sortable: true
        },
        {
          key: 'date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'email',
          label: 'Organisateur',
          sortable: true
        },
        { 
          key: 'action', 
          label: '',
          sortable: false
        }
      ],
      events: [],
      isBusy: true,
      filter: ""
    }
  },
  mounted () {
    axios
      .get(this.$hostname+'/evenement/')
      .then(response => {
        this.events = response.data
        this.isBusy = false;
      })
  }, methods: {
    open(id) {
      this.$router.push({path: '/evenement/'+id})
    },
    refresh() {
      this.isBusy = true
      this.events = []
      axios
      .get(this.$hostname+'/evenement/')
      .then(response => {
        this.events = response.data
        this.isBusy = false;
      })
    }
  }
}
</script>

<style scoped>
main {
  margin: 0 auto;
}

.inputGroup {
  margin-left: 15px;
}
</style>