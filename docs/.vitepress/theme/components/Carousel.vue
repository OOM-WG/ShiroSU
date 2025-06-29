<template>
    <div class="carousel-container">
      <n-carousel 
        autoplay 
        :interval="4000"
        :show-dots="false"
        :show-arrow="false"
        dot-type="line"
        trigger="hover"
      >
        <img
          class="carousel-img"
          src="/assets/carousel/1.png"
        >
        <img
          class="carousel-img"
          src="/assets/carousel/2.png"
        >
        <img
          class="carousel-img"
          src="/assets/carousel/3.png"
        >
        <img
          class="carousel-img"
          src="/assets/carousel/4.png"
        >
      </n-carousel>
    </div>
  </template>
  
  <script setup lang="ts">
  import { NCarousel } from 'naive-ui'
  </script>
  
  <style scoped>
  .carousel-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 24px auto;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    display: block;
  }
  </style>