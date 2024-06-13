<!-- src/views/Admin.vue -->
<template>
    <div>
      <div class="head">
        <h1>Welcome Admin</h1>
      </div>
      <div class="padd mt-4">
        <div class="stats">
          <div>
            <h3>Members registered last month</h3>
            <p>30</p>
            <p class="text-caption">+20% month over month</p>
          </div>
          <div>
            <h3>Money collected last month</h3>
            <p>Ksh 44,500.30</p>
            <p class="text-caption">+33% month over month</p>
          </div>
          <div>
            <h3>Activities done</h3>
            <p>50</p>
            <p class="text-caption">-8% month over month</p>
          </div>
        </div>
        <div class="charts mt-8">
          <div>
            <h3>Report on tithes collected in a month</h3>
            <div class="chart-placeholder">[Chart]</div>
          </div>
          <div>
            <h3>Report on number of church members registered in a month</h3>
            <div class="chart-placeholder">[Chart]</div>
          </div>
        </div>
      </div>
      <div class="padd mt-8">
        <h3>Church Members List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Location</th>
              <th>Date added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Emmanuel Arungwaefwe</td>
              <td>Male</td>
              <td>emanu@gmail.com</td>
              <td>0771445116</td>
              <td>Boroto</td>
              <td>2018-06-05</td>
              <td><a href="#">Edit</a> <a href="#">Delete</a></td>
            </tr>
            <tr>
              <td>Grace Mwasou</td>
              <td>Female</td>
              <td>grace@gmail.com</td>
              <td>0771445116</td>
              <td>Komolo</td>
              <td>2018-06-05</td>
              <td><a href="#">Edit</a> <a href="#">Delete</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Admin'
  }
  </script>
  
  <style scoped>
  .head {
    background-color: #333;
    color: #fff;
  }
  .padd {
    padding: 16px;
  }
  .mt-4 {
    margin-top: 16px;
  }
  .mt-8 {
    margin-top: 32px;
  }
  .stats {
    display: flex;
    justify-content: space-between;
  }
  .charts {
    display: flex;
    justify-content: space-between;
  }
  .chart-placeholder {
    width: 100%;
    height: 200px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #333;
    color: #fff;
  }
  </style>
  