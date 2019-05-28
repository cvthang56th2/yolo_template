<template>
  <div>
    <h1>News</h1>
    <v-btn @click="showPopupDetail = true">
      ADD
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">
          {{ props.item.calories }}
        </td>
        <td class="text-xs-right">
          {{ props.item.fat }}
        </td>
        <td class="text-xs-right">
          {{ props.item.carbs }}
        </td>
        <td class="text-xs-right">
          {{ props.item.protein }}
        </td>
        <td class="text-xs-right">
          {{ props.item.iron }}
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" />
    </div>
    <PopupDetail v-model="showPopupDetail" />
  </div>
</template>

<script src="./index.js" />
