<template>
  <div>
    <h1>News</h1>
    <v-btn @click="showPopupDetail = true">
      ADD
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="news"
      :search="search"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">
          {{ props.item.description }}
        </td>
        <td class="text-xs-right">
          {{ props.item.createdAt }}
        </td>
        <td class="text-xs-right">
          <v-icon @click="editNews(props.item._id)">
            edit
          </v-icon>
          <v-icon @click="removeNews(props.item._id)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <PopupDetail v-model="showPopupDetail" :news-id="selectedNewsId || ''" @save="fetchData" />
  </div>
</template>

<script src="./index.js" />
