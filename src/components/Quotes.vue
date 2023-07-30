<script setup>
import { quotes } from '../data/quotes.json';

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<template>
  <div>
    <p class="bold text-xl text-white dark:text-slate-100">
      {{ randomQuote.quote }}
    </p>
    <p
      class="text-l italic text-slate-300 hover:text-white dark:text-slate-100 hover:dark:text-slate-400"
    >
      {{ randomQuote.author }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
