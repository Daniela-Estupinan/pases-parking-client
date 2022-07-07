<template>
<v-app style="background: #FFFFF">
<div id="app">
  <label for="">Type</label>
  <select v-model="selectedType">
    <option value="" disabled selected hidden>Type</option>
    <option value="Mensual">Mensual</option>
    <option value="Anual">Anual</option>
    <option value="Semestral">Semestral</option>
  </select>

  <label for="">From</label>
  <input type="date" v-model="startDate">

  <label for="">To</label>
  <input type="date" v-model="endDate">

 <table class="table table-hover">
    <thead>
      <tr class="header">
        <th scope="col">Nombre</th>
        <th scope="col">Tipo de pase</th>
        <th scope="col">Fecha de Compra</th>
        <th scope="col">Pases Restantes</th>
        <th scope="col">Fecha Tentativa</th>
        <th scope="col">Total $ </th>
      </tr>
    </thead>
    <tbody>
      <tr class="list-item" v-for="item in filterItem" :key="item._id">
        <th scope="row">{{item.name}}</th>
        <td>{{item.type}}</td>
        <td>{{item.date }}</td>
        <td>{{pasesRestantes}}</td>
        <td>{{fechaTentativas}}</td>
        <td>{{pasesDinero}}</td>
      </tr>

    </tbody>
  </table>
</div>
</v-app>
</template>
<style>
.list-item {
  margin-top: 50px;
  
  
}
.header{
  background-color: rgb(221, 174, 237);
}
table, th, td{
  margin-top:50px;
  border: 0.5px solid rgb(47, 45, 45);
  text-align: center;
  
}
th {
  height: 70px;
}
table{
  width: 100%;
}
.list-item:hover {background-color: rgb(236, 185, 166);}
select,
input {
  border: none;
  padding: 10px 15px;
  background-color: #c1c1c1;
  border-radius: 10px;
  margin-inline: 25px;
  align-self: center;
}

</style>
<script>
import API from "../api.js"
  export default {
    name: 'Home',
    data() {
      return{
    selectedType: "",
    startDate: null,
    endDate: null,
    pasesMensuales: 96,
    pasesAnuales: 1052,
    pasesSemestrales: 576,
   
    items: [
      {
        name: "Nolan",
        type: "Mensual",
        pases: 30,
        date: "08/01/2021"
      },
      {
        name: "Edgar",
        type: "Anual",
        pases: 365,
        date: "08/11/2021"
      },
      {
        name: "John",
        type: "Semestral",
        pases: 180,
        date: "08/21/2021"
      }
    ]
      }
  },

  computed: {
    fechaTentativas() {
      let fecha = this.fechaTentativa(this.date);
      let result =
        "" +
        (fecha.getDate() > 9 ? "" : "0") +
        fecha.getDate() +
        "/" +
        (fecha.getMonth() + 1 > 9 ? "" : "0") +
        (fecha.getMonth() + 1) +
        "/" +
        fecha.getFullYear();

      return result;
    },
    pasesRestantes() {
      let pasesRestantes = this.difference(this.date);
      let pasesM = this.pasesMensuales;
      let pasesA = this.pasesAnuales;
      let pasesS = this.pasesSemestrales;
      let filterType = this.selectedType;
      if (filterType == "Mensual") {
        if (pasesRestantes > pasesM) {
          return "No tiene más pases";
        } else {
          return pasesM - pasesRestantes;
        }
      } else if (filterType == "Anual") {
        if (pasesRestantes > pasesA) {
          return "No tiene más pases";
        } else {
          return pasesA - pasesRestantes;
        }
      } else {
        if (pasesRestantes > pasesS) {
          return "No tiene más pases";
        } else {
          return pasesS - pasesRestantes;
        }
      }
    },
    pasesDinero() {
      let pasesRestantes = this.difference(this.date);
      let pasesM = this.pasesMensuales;
      let pasesA = this.pasesAnuales;
      let pasesS = this.pasesSemestrales;
      let filterType = this.selectedType;
      console.log("Tipo " + filterType);
      if (filterType == "Mensual") {
        if (pasesRestantes > pasesM) {
          return "$0";
        } else {
          return Math.round((pasesM - pasesRestantes) * 0.26);
        }
      } else if (filterType == "Anual") {
        if (pasesRestantes > pasesA) {
          return "$0";
        } else {
          return Math.round((pasesA - pasesRestantes) * 0.076);
        }
      } else {
        if (pasesRestantes > pasesS) {
          return "$0";
        } else {
          return Math.round((pasesM - pasesRestantes) * 0.087);
        }
      }
    },
    filterItem() {
      let filterType = this.selectedType;
      let startDate = this.localizeDate(this.startDate);
      let endDate = this.localizeDate(this.endDate);
      const itemsByType = filterType
        ? this.items.filter((item) => item.type === filterType)
        : this.items;
      return itemsByType.filter((item) => {
        const itemDate = new Date(item.date);
        if (startDate && endDate) {
          return startDate <= itemDate && itemDate <= endDate;
        }
        if (startDate && !endDate) {
          return startDate <= itemDate;
        }
        if (!startDate && endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }
  },
  methods: {
    localizeDate(date) {
      if (!date || !date.includes("-")) return date;
      const [yyyy, mm, dd] = date.split("-");
      return new Date(`${mm}/${dd}/${yyyy}`);
    },
    formatDate(date) {
      return new Intl.DateTimeFormat("es-US", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
    difference() {
      let startDate = this.localizeDate(this.startDate);
      let endDate = this.localizeDate(this.endDate);
      var difference = Math.abs(endDate - startDate);
      let days = difference / (1000 * 3600 * 24);
      return Math.round(days);
      console.log("Day " + days);
    },
    fechaTentativa() {
      let pases = this.pasesRestantes;
      const fecha = new Date(this.endDate);
      //let endDate = this.localizeDate(this.endDate);
      fecha.setDate(fecha.getDate() + pases);

      console.log("Fecha" + fecha);
      return fecha;
    }
  }
  };
</script>
 