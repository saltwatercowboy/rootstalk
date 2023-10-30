<template>
  <div class="header-component-one">
    <h1>{{ title }}</h1>
    <a href="localhost:5173">Home</a>
    <a href="index.html">Home</a>
    <div v-if="hasDropdown" class="dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        Menu
        <div v-if="showDropdown" class="dropdown-content">
            <a href="#" v-for="item in dropdownItems" :key="item">{{ item }}</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Component 1 Placeholder'
        },
        hasDropdown: {
            type: Boolean,
            default: false
        },
        dropdownItems: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            showDropdown: false
        };
    }
}
</script>