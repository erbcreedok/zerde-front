<template>
    <section class="jumbotron">
        <h1>
            <span class="h1">{{ 'atameken academy' | translate | capitalizeEach }}</span> <br/>
            <span class="jumbotron-subtitle">{{ 'for beginners and acting entrepreneurs' | translate }}</span>
        </h1>
    </section>
</template>

<script>
    export default {
      name: 'jumbotron'
    }
</script>

<style scoped lang="scss">
    .jumbotron {
        color: white;
        background: #304FFE;
        padding: 10rem 0;
        border-top: 1px solid #6779ff;
    }
    h1 {
        text-align: center;
    }
    .h1 {
        font-size: 5rem;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 1rem;
    }
    .jumbotron-subtitle {
        font-size: 1.8rem;
        font-weight: normal;
    }
</style>
