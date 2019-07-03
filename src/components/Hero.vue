<template>
    <section class="hp_hero">
        <div class="wrap hp_hero_wrap">
            <div class="hp_hero_content">
                <div class="hp_hero_title">ATAMEKEN</div>
                <div class="hp_hero_subtitle">
                    <span class="txt-rotate" data-period="1000">{{txtAnimate}}</span>
                    для начинающих и действующих <br>предпринимателей
                </div>
                <div class="hp_hero_tags">
                    <router-link v-for="tag in tags" :key="tag.id" :to="{name: 'kb-search', query: {themes: `[${tag.id}]`}}" class="button button-small button-primary button-inverse">{{tag.name}}</router-link>
                </div>
            </div>

            <div class="hp_hero_illustration"></div>
        </div>
    </section>
</template>

<script>
    import kbService from "../_services/kb.service";

    export default {
      data() {
        return {
          txtActive: 0,
          txtLength: 0,
          txtDirection: 1,
          txtArray: [ "медиа", "сообщество", "образование" ],
          txtDuration: 100,
          tags: [],
        }
      },
      methods: {
        changeTxt() {
          setTimeout(() => {
            if (this.txtDirection > 0) {
              this.txtLength += 1;
            }
            if (this.txtDirection < 0) {
              this.txtLength -= 1;
            }
            if (this.txtLength === this.txtArray[this.txtActive].length + 1) {
              this.txtDirection = -1;
            }
            if (this.txtLength === 0) {
              this.txtDirection = 1;
              this.txtActive += 1;
              this.txtActive %= this.txtArray.length;
            }
            this.txtDuration = Math.random() * 300 + this.txtDirection * 100;
            this.changeTxt();
          }, this.txtDuration)
        }
      },
      computed: {
        txtAnimate() {
          return this.txtArray[this.txtActive].substr(0, this.txtLength);
        }
      },
      mounted() {
        this.changeTxt();
        kbService.loadThemes().then(themes => {
          this.tags = themes;
        });
      },
    }
</script>
