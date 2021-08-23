
<template>
  <div>
    <q-table
      ref="ccTableGrid"
      class="my-sticky-header-column-table"
      flat
      bordered
      square
      :pagination.sync="rowsPerPage"
      :fullscreen.sync="isFullscreen"
      :grid="mode === 'grid'"
      :data="cData"
      :columns="columns"
      row-key="__index"
      :loading="innerLoading"
      :rows-per-page-options="[0]"
      separator="cell"
      :selection="selection"
      :selected.sync="selected"
      v-bind="$attrs"
      :color="theme"
      v-on="$listeners"
      @request="requestServerInteraction(paginationControl)"
    >
      <!-- For Grid View -->
      <template
        v-if="mode === 'grid'"
        v-slot:item="props"
      >
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"
          :style="props.selected ? 'transform: scale(0.98);' : ''"
        >
          <q-card
            class="q-mb-sm"
            square
            :class="props.selected ? 'shadow-5' : ''"
            :style="{
              background: colorStatus[Object.keys(colorStatus)[0]][props.row[Object.keys(colorStatus)[0]]]
            }"
          >
            <!-- old @click.native="selected = [{ __index: props.row.__index }]; props.selected = true"
            -->
            <q-card-section
              v-if="selection == 'multiple'"
              @click.native="props.selected = !props.selected"
              class="relative-position"
            >
              <!-- <div class="ellipsis">{{ props.cols[0].value }}</div> -->
              <q-checkbox
                dense
                :color="theme"
                v-model="props.selected"
              />
            </q-card-section>
            <q-separator />
            <q-card-section
              @click.native="props.selected = !props.selected"
              class="q-pa-none"
            >
              <q-list>
                <!-- You can check each column or item
                for another conditional rendering you like that certain column would look
                like depending on the a certain prop that column definition has.
                -->
                <template v-for="(col,i) in props.cols">
                  <q-item
                    v-if="i > 0 && col.name !== 'btnsActions'"
                    :key="col.name"
                  >
                    <q-item-section>
                      <q-item-label
                        lines="2"
                        caption
                      >{{ col.label }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <!-- :class="`text-${col.align}`" -->
                      <q-item-label
                        lines="2"
                        :class="`text-right`"
                      >{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <template
                    v-if="col.name === 'btnsActions'"
                    class="text-center"
                  >
                    <q-btn-dropdown
                      :key="col.name"
                      v-if="actionsDropDown && $q.screen.width < 1400"
                      outline
                      color="primary"
                      label="Ações"
                    >
                      <q-list
                        bordered
                        separator
                        style="min-width: 100px"
                      >
                        <template v-for="(action, idx) in actions">
                          <!-- included props.row beside the id to be emitted data -->
                          <q-item
                            :key="idx"
                            @click.native="$emit(action.event.toLowerCase().replace(' ', '-'), [props.row])"
                            clickable
                            v-ripple
                            v-close-popup
                            v-if="!action.disable"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :color="!action.color ? theme : action.color"
                                :name="action.icon"
                              />
                            </q-item-section>
                            <q-item-section>{{capitalize(`${action.name}`)}}</q-item-section>
                          </q-item>
                        </template>
                      </q-list>
                    </q-btn-dropdown>
                    <template v-else>
                      <q-btn
                        class="q-mx-sm"
                        flat
                        dense
                        no-caps
                        ripple
                        no-wrap
                        v-for="(action, i) in actions"
                        :label="action.name"
                        :icon="action.icon"
                        :disable="action.disable"
                        :key="i"
                        :color="!action.color ? theme : action.color"
                        @click="$emit(action.event.toLowerCase().replace(' ', '-'), props.row)"
                      >
                      </q-btn>
                    </template>
                  </template>
                </template>

              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <!-- For List Table View -->
      <template
        v-slot:header="props"
        v-if="selection !== 'multiple'"
      >
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-bold"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template
        v-slot:body="props"
        v-if="mode === 'list'"
      >
        <q-tr
          :props="props"
          @click.native="itemClicado(props.row)"
          class="cursor-pointer"
          :style="{
            background: colorStatus[Object.keys(colorStatus)[0]][props.row[Object.keys(colorStatus)[0]]]
          }"
        >
          <!-- @click.native="selected = [{ __index: props.row.__index }]" @click.native="props.selected = !props.selected"-->
          <q-td
            auto-width
            v-if="actionsDisplayType === 'top' && selection == 'multiple'"
          >
            <q-checkbox
              :color="theme"
              v-model="props.selected"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template v-if="col.name !== 'btnsActions'">
              {{ col.value }}
            </template>
            <template
              v-if="col.name === 'btnsActions'"
              class="text-center"
            >
              <q-btn-dropdown
                v-if="actionsDropDown && $q.screen.width < 1400"
                outline
                color="primary"
                label="Ações"
              >
                <q-list
                  bordered
                  separator
                  style="min-width: 100px"
                >
                  <template v-for="(action, idx) in actions">
                    <!-- included props.row beside the id to be emitted data -->
                    <q-item
                      :key="idx"
                      @click.native="$emit(action.event.toLowerCase().replace(' ', '-'), [props.row])"
                      clickable
                      v-ripple
                      v-close-popup
                      v-if="!action.disable"
                    >
                      <q-item-section avatar>
                        <q-icon
                          :color="!action.color ? theme : action.color"
                          :name="action.icon"
                        />
                      </q-item-section>
                      <q-item-section>{{capitalize(`${action.name}`)}}</q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-btn-dropdown>
              <template v-else>
                <q-btn
                  class="q-mx-sm bg-padrao"
                  flat
                  round
                  dense
                  no-caps
                  ripple
                  no-wrap
                  v-for="(action, i) in actions"
                  :label="action.name"
                  :icon="action.icon"
                  :disable="action.disable"
                  :key="i"
                  :color="!action.color ? theme : action.color"
                  @click="$emit(action.event.toLowerCase().replace(' ', '-'), props.row)"
                >
                </q-btn>
              </template>
            </template>

          </q-td>
        </q-tr>
      </template>
      <template
        v-slot:bottom="props"
        class="col-12"
      >
        <div class="row col-12 items-center">
          <div class="col-xs-6 col-sm-4 self-center text-body2">
            Registros: {{ infoRegistros }}
          </div>
          <div
            v-if="pagination.total_pages > 1"
            class="col flex flex-center order-xs-first order-sm-none"
          >
            <q-pagination
              input
              input-class="text-blue-grey-10 text-bold"
              v-model="pagination.page"
              :value="pagination.page"
              :color="theme"
              :min="1"
              :max="pagination.total_pages || 1"
              :max-pages="4"
              :ellipses="true"
              boundary-links
              direction-links
              @input="(page) => $emit('cc-table:pagination', page)"
            />
          </div>
          <div class="col-xs-6 col-sm-3 text-right absolute-bottom-right">
            <q-btn
              flat
              :color="theme"
              round
              dense
              :icon="mode === 'grid' ? 'list' : 'grid_on'"
              @click="mode = mode === 'grid' ? 'list' : 'grid'"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{mode==='grid' ? 'Lista' : 'Cartões'}}</q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>

    </q-table>

    <q-inner-loading :showing="innerLoading && mode === 'grid'">
      <q-spinner
        color="secondary"
        size="50px"
      />
    </q-inner-loading>
  </div>
</template>

<script>

const capitalize = str =>
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')

export default {
  name: 'ccTable',
  props: {
    // the table data
    data: {
      type: [Array, Object],
      default: null
    },
    // column definition
    columns: {
      type: [Array, Object],
      default: null
    },
    // actions shown when user right clicks on row or onto a table item
    // pass an array of strings pertaining to the actions that are available
    // for the current table, action name will be emitted
    // ie. if you pass :actions="['edit']" edit event will be emitted when you click on the Edit action
    actions: {
      type: [Array, Object],
      default: null
    },
    actionsTop: {
      type: [Array, Object],
      default: null
    },
    actionsDisplayType: {
      type: String,
      default: 'top',
      validator: value => ['top', 'menu'].indexOf(value) !== -1
    },
    colorStatus: {
      type: Object,
      default: () => {
        return { 'valor': '' }
      },
      validator: value => {
        return Object.keys(value).length !== 0 && value.constructor === Object
      }
    },
    // color theme
    theme: {
      type: String,
      default: 'primary'
    },
    // pass this prop if you want to limit the options
    // on the table. props are shown in the default
    topRightOptions: {
      type: Object,
      default: () => {
        return {
          cellLines: true,
          fullscreenToggle: true
        }
      }
    },
    // current pagination settings of the table
    pagination: {
      type: Object,
      default: () => {
        return {
          page: 1,
          total_pages: 1,
          count: 1,
          size_per_page: 1
        }
      }
    },
    selection: {
      type: String,
      default: 'multiple'
    },
    dark: {
      type: Boolean,
      default: () => false
    },
    tableHeight: String,
    actionsDropDown: {
      type: Boolean,
      default: false
    },
    // pass a boolean model if you want to show a loading animation
    innerLoading: {
      type: Boolean,
      default: () => false
    },
    headerLastColumFix: {
      type: Boolean,
      default: false
    },
    headerFix: {
      type: Boolean,
      default: false
    },
    classFullscreen: {
      type: String,
      default: 'sticky-header-table-full-screen'
    },
    classNormalScreen: {
      type: String,
      default: 'sticky-header-last-column-table'
    }
  },
  inheritAttrs: false,
  data () {
    return {
      isFullscreen: false,
      // rowsPerPage :: necessário para que a q-table não controle paginação
      rowsPerPage: { rowsPerPage: 0 },
      selected: [],
      rowsCount: this.pagination.rowsPerPage,
      page: this.pagination.page,
      mode: 'list',
      paginationControl: this.pagination,
      loading: this.innerLoading
    }
  },
  computed: {
    cData () {
      return this.data
    },
    pageTotalNumber () {
      return Math.max(1,
        Math.ceil(this.cPagination.rowsNumber / this.cPagination.rowsPerPage)
      )
    },
    cPagination: {
      get () {
        return this.pagination
      },
      set (data) {
        const pag = data
        // this.paginationControl = pag
        this.pagination = pag
      }
    },
    infoRegistros () {
      // eslint-disable-next-line eqeqeq
      if (this.cPagination.total_pages == 1) {
        return this.cPagination.count
      }
      // eslint-disable-next-line camelcase
      const qtd_atual = this.cPagination.count > this.cPagination.size_per_page * this.cPagination.page
        ? this.cPagination.size_per_page * this.cPagination.page : this.cPagination.count
      // eslint-disable-next-line camelcase
      return qtd_atual + ' de ' + this.cPagination.count
    }
    // classStyled () {
    //   if (this.headerFix && !this.isFullscreen) {
    //     return 'sticky-header-table'
    //   }
    //   if (this.headerLastColumFix && !this.isFullscreen) {
    //     return 'sticky-header-last-column-table'
    //   }
    //   if (this.headerFix && this.isFullscreen) {
    //     return 'sticky-header-table-full-screen'
    //   }
    //   if (this.headerLastColumFix && this.isFullscreen) {
    //     return 'sticky-header-last-column-table-fullscreen'
    //   }
    //   return 'sticky-header-table'
    // }
  },
  methods: {
    capitalize,
    notify (notif) {
      this.$q.notify({
        type: 'negative',
        message: 'Not allowed to delete.'
      })
    },
    itemClicado (item) {
    },
    getCellValue (col, row) {
      const val = typeof col.field === 'function' ? col.field(row) : row[col.field]
      return col.format !== void 0 ? col.format(val, row) : val
    },
    requestServerInteraction (prop = {}) {
      this.$emit('update:cctable-pagination', {
        pagination: prop
      })
    },
    paginationUpdate (page) {
      if (this.paginationControl.page !== page) {
        this.paginationControl.page = page
        this.requestServerInteraction(this.paginationControl)
      }
    },
    rowNumberPerPage (rows) {
      if (this.paginationControl.rowsPerPage !== rows) {
        this.paginationControl.rowsPerPage = rows
        this.$emit('update:cctable-pagination', {
          pagination: this.paginationControl
        })
      }
    }
  },
  watch: {
    selected (v) {
      this.$emit('cctable-selected-rows', this.selected)
      this.$emit('update:selected', this.selected)
    },
    // Garantir que as informações irão sincronizar quando alteradas
    // no componente superior.
    '$attrs.selected' (v) {
      this.selected = v
    }
    // pagination: {
    //   deep: true,
    //   handler (newVal, oldVal) {
    //     this.paginationControl = newVal
    //   }
    // }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>

<style lang="stylus">
.grid-style-transition
  transition transform .3s
</style>
