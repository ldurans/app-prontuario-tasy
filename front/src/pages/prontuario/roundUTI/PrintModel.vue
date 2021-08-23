<template>
  <q-dialog
    @hide="fecharModal"
    @show="imprimir"
    :value="imprimirRelatorio"
  >

    <div :id="`pagePrint-${id}`">

      <body id="pageInit">
        <div class="marginsPage">

          <div class="page-header">
            <div class="row">
              <div class="column left">
                <div class="container-header">
                  <div class="row text-left negrita h3"> AAA</div>
                  <div class="row h4">Fone: </div>
                  <div class="row h4">E-mail: </div>
                  <div class="row h4">Endereço: </div>
                  <hr
                    class="row"
                    style="margin-top: 25px; margin-left: -10px; width: 95%"
                  >
                </div>
              </div>

              <div class="column right column-rigth-header">
                <div style="margin-top: -4px; width: 250px; height: 80px;">
                  <img
                    class="logo"
                    src="https://agenciabrave.com.br/wp-content/uploads/2016/03/logomarca-clinica.jpg"
                    alt="logo"
                    width="250"
                    height="120"
                  >
                  <div class="row text-center h3">&nbsp;</div>
                </div>
              </div>
            </div>

          </div>

          <div class="page-footer">
            <div style="text-align: center">
              <!-- <hr style="width: 40%; margin-right: 2cm !important;"> -->
              <p style="margin-top: -10px; margin-right: 2cm !important;"> Medico </p>
              <p style="margin-top: -15px; margin-right: 2cm !important;  padding: none;">CRM 123</p>
            </div>

          </div>

          <table>

            <thead>
              <tr>
                <td>
                  <!--place holder for the fixed-position header-->
                  <div class="page-header-space"></div>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <!--*** CONTENT GOES HERE ***-->
                  <!-- style="line-height: 3; text-align: justify" -->
                  <div class="page">
                    <pre>
                    {{ corpo }}
                  </pre>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td>
                  <!--place holder for the fixed-position footer-->
                  <div class="page-footer-space"></div>
                </td>
              </tr>
            </tfoot>

          </table>
        </div>
      </body>

    </div>
  </q-dialog>
</template>
<script>
const cssText = `
  .marginsPage {
    background-color: #000;
    margin-left: 1cm !important;
    margin-right: 1cm !important;
  }
  .page-header,
  .page-header-space {
    height: 150px !important;
    background-color: #000;
    margin-left: 1cm !important;
    margin-right: 1cm !important;
  }
  .page-footer,
  .page-footer-space {
    height: 100px !important;
    margin-left: 1cm !important;
    margin-right: 1cm !important;
  }

  .page-footer {
    margin-right: 1cm !important;
    position: fixed !important;
    bottom: 0 !important;
    width: calc(100% - 2cm) !important;
    border-bottom: 1px solid black !important; /* for demo */
    background: yellow !important; /* for demo */
  }

  .page-header {
    position: fixed !important;
    top: 0px !important;
    width: calc(100% - 2cm) !important;
    background: yellow !important; /* for demo */
  }

  .page {
    page-break-after: always !important;
    margin-left: 1cm !important;
    margin-right: 0.5cm !important;
  }
  .h1 {
    font-size: 25px;
  }
  .h2 {
    font-size: 20px;
  }
  .h3 {
    font-size: 12px;
  }
  .h4 {
    font-size: 9px;
  }
  .container-header {
    padding-top: 60px;
  }
  .p {
    margin-top: 5px;
    margin-top: 5px;
    line-height: 50px;
  }
  .column-rigth-header {
    position: fixed;
    width: 250px;
    height: 80px;
    top: 0px;
    padding-top: 50px;
    right: 0px;
  }
  .row {
    left: 0;
    right: 0;
    position: relative;
  }
  div.right {
    width: 40%;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  @media print {
    #BrowserPrintDefaults {
      display: none;
    }
    @page {
      size: A4;
      margin: 0px;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
    }
    img.logo {
      width: 250px;
      height: 80px;
      object-fit: fill;
    }
    body {
      top: 0px !important;
      margin: 0px !important;
      left: 0px;
      width: 210mm;
      height: 297mm;
      background-color: #000;
    }
    thead {
      display: table-header-group !important;
    }
    tfoot {
      display: table-footer-group !important;
    }
    button {
      display: none;
    }
    header {
      display: none;
      position: fixed;
      top: 0;
    }
    footer {
      display: none;
      position: fixed;
      bottom: 0;
    }
    .page-header {
      background-color: #000 !important;
    }
  }
`
import { Printd } from 'printd'

export default {
  name: 'ccPrintModel',
  props: {
    imprimirRelatorio: {
      type: Boolean,
      required: true
    },
    styleP: {
      type: String,
      default: '<p style="line-height: 0.1cm;">'
    },
    id: [String, Number],
    corpo: String
  },
  data () {
    return {
      dataImpressao: '29/09/2019'
    }
  },
  computed: {
    conteudoTexto () {
      let data = this.corpo
      // data = data.replace(/<p>/g, this.styleP)
      return data
    }
  },
  beforeMount () {
    this.$nextTick(function () {
      window.addEventListener('afterprint', this.fecharModal)
    })
  },
  beforeDestroy () {
    window.removeEventListener('afterprint', this.fecharModal)
    this.$emit('update:imprimirRelatorio', false)
  },
  methods: {
    print () {
      this.d = new Printd()
      const { contentWindow } = this.d.getIFrame() //eslint-disable-line
      const elemento = `#pagePrint-${this.id}`
      this.d.print(document.querySelector(elemento), [cssText])
    },
    fecharModal () {
      this.$emit('update:imprimirRelatorio', false)
    },
    imprimir () {
      setTimeout(function () {
        this.print()
      }, 1000)
      setTimeout(function () {
        this.fecharModal()
      }, 1000)
    }
  }

}
</script>
<style scoped>
#pageInit {
  margin: 0px;
  display: none;
}

@media print {
  #pageInit {
    display: block !important;
  }
  table::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3; /* controla a opacidade da imagem */
    z-index: -1;
    background-image: url(http://placecage.com/250/250);
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
