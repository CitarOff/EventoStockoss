<template>
  <main>
    <!-- Liste des évènements -->
    <section>
      <v-card>
      <v-card-title>
        Évènements
        <v-spacer></v-spacer>
        <v-btn
          class="mx-3"
          fab
          dark
          x-small
          color="indigo"
          @click="search = ''"
        >
          <v-icon dark>
            mdi-cancel
          </v-icon>
        </v-btn>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="events"
        :search="search"
        :loading="isBusy"
        loading-text="Loading... Please wait"
      >
      <template v-slot:top>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="indigo"
          @click="refresh()"
        >
          <v-icon dark>
            mdi-cached
          </v-icon>
        </v-btn>

        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="indigo"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Nouvelle évènement</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nom de l'évènement*"
                      counter
                      maxlength="60"
                      required
                      v-model="newEvent.nom"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                      :rules="emailRules"
                      v-model="newEvent.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="newEvent.date"
                          label="Date*"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="newEvent.date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-time-picker
                      v-model="newEvent.heure"
                      landscape
                      required
                      format="24hr"
                    ></v-time-picker>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      solo
                      name="input-7-4"
                      label="Description*"
                      counter
                      maxlength="300"
                      required
                      v-model="newEvent.desc"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indique un champ obligatoire</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="add()"
              >
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="open(item.id)"
        >
          mdi-format-list-bulleted-square
        </v-icon>
      </template>

      <template v-slot:item.nom="{ item }">
        <v-chip
          :color="getColor(item.dateNT)"
          dark
        >
          {{ item.nom }}
        </v-chip>
      </template>
      
      </v-data-table>
      <v-card-title class="legende">
        <span> Légendes: </span>
        <span class="blocLegende">-10 jours</span>
        <span class="blocLegende">+10 jours</span>
        <span class="blocLegende">Passé</span>
      </v-card-title>
      <div >
        
      </div>
    </v-card>
    </section>

    <!-- Statistiques -->
    <section>
      <v-card width="100%">
        <v-card-title class="black--text mt-8">
          Statistiques
        </v-card-title>

        <v-card-text>
          <HistogramSlider
            v-if="!isBusy && historygram.length > 1"
            style="margin: 0px auto"
            :width="600"
            :bar-height="300"
            :data="historygram"
            :prettify="prettify"
            :drag-interval="true"
            :force-edges="false"
            :colors="['#1976d2', '#3f51b5']"
            :min="minHistory"
            :max="maxHistory"
          />
        </v-card-text>
      </v-card>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data: function () {
    return {
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      },
      dialog: false,
      emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'E-mail invalide'],
      headers: [
        {
          value: 'nom',
          text: 'Nom',
          filterable: true
        },
        {
          value: 'date',
          text: 'Date',
          filterable: true
        },
        {
          value: 'email',
          text: 'Organisateur',
          filterable: true
        },
        { 
          value: 'action', 
          text: 'Ouvrir',
          filterable: false
        }
      ],
      events: [],
      isBusy: true,
      menu2: false,
      search: "",
      today: "",
      newEvent: {
        nom: '',
        email: '',
        desc: '',
        date: '',
        heure: ''
      },
      minHistory: "",
      maxHistory: "",
      dataHistorygram: [],
      historygram: []
    }
  },
  mounted () {
    this.today = moment(new Date()).format('DD/MM/YYYY');
    this.minHistory = this.removeDays(Date.now(), 10).valueOf();
    this.maxHistory = this.addDays(Date.now(), 10).valueOf();

    axios
      .get(this.$hostname+'/evenement/')
      .then(response => {
        this.events = response.data
      })

      axios
      .get(this.$hostname+'/evenement/date')
      .then(response => {
        response.data.forEach(element => {
          this.dataHistorygram.push(element.date)
        });

        this.historygram = this.dataHistorygram.map(d => new Date(d))

        this.isBusy = false;
      })
  }, methods: {
    addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days).valueOf();
      return result;
    }, 
    removeDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() - days).valueOf();
      return result;
    }, 
    add() {
      const {nom, email, desc, date, heure} = this.newEvent
      if(nom && email && desc && date && heure) {
        axios
        .post(this.$hostname+'/evenement/', this.newEvent)
        .then(() => {
          this.newEvent = {
            nom: '',
            email: '',
            desc: '',
            date: '',
            heure: ''
          }
          this.dialog = false
          this.refresh()
        })
      }
    },
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
    },
    getColor (_date) {
      let startDate = moment(this.today, "DD.MM.YYYY");
      let endDate = moment(_date, "DD.MM.YYYY");
      let diff = endDate.diff(startDate, 'days');
      let isBefore = moment(this.today,"DD/MM/YYYY").isAfter(moment(_date,"DD/MM/YYYY"), 'days')

      if(isBefore){
        return 'grey'
      } else if(diff > 10){
        return '#555555'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style scoped>
section {
  width: 90%;
  margin: 0 auto;
}

.inputGroup {
  margin-left: 15px;
}

.legende {
  display: flex;
  flex-direction: row;
  margin-left: 25px;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  letter-spacing: 0.0125em;
  line-height: 2rem;
}

.blocLegende {
  font-size: 0.8em;
   align-content: center;
  align-items: center;
  letter-spacing: 0.0125em;
  line-height: 2rem;
}

.blocLegende:nth-child(2):before {
  content: " ";
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-left: 25px;
  background-color: #f44336;
}

.blocLegende:nth-child(3):before {
  content: " ";
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background-color: #555555;
}

.blocLegende:nth-child(4):before {
  content: " ";
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background-color: #9e9e9e;
}

</style>