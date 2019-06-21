<template>
  <div>
    <div class="profile_stats" v-if="false">
      <div class="profile_stats_counter">
        65
      </div>
      <div class="profile_stats_description">
        просмотров профиля
        <br>за последние 7 дней
      </div>

      <div class="profile_stats_users">
        <a href="#" class="avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></a>
        <a href="#" class="avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></a>
        <a href="#" class="avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></a>
      </div>

      <div class="profile_stats_chart">
        график
      </div>
    </div>

    <div class="profile_section">
      <div class="caption profile_subtitle">
        О себе
      </div>

      <template v-if="user.about && user.about !== ''">
        <div class="profile_about" v-html="user.about"></div>
      </template>
      <template v-else>
        <div class="profile_about">
          <span class="muted">Қолданушы өзі жайлы ақпарат жазбады</span>
        </div>
      </template>
      <!--<a href="#" rel="nofollow" class="profile_custombutton button button-small button-primary button-outline">Пользовательская кнопка</a>-->
    </div>

    <div class="profile_section">
      <div class="caption profile_subtitle">
        Основная информация
      </div>
      <template v-if="user.birth_date || (user.region && user.region.length)">
        <div class="dtable dtable-justify">
          <div class="dtable_row" v-if="user.birth_date">
            <div class="dtable_col dtable_col-muted dtable_col-4">День рождения</div>
            <div class="dtable_col dtable_col-4">{{user.birth_date}} <span class="muted">({{$t('age {val}', {val: user.age},  user.age)}})</span></div>
          </div>

          <div class="dtable_row" v-for="region in user.region" :key="region.id">
            <div class="dtable_col dtable_col-muted dtable_col-4">Город</div>
            <div class="dtable_col dtable_col-4">{{region.name}}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <span class="muted">Деректер көрсетілмеген</span>
      </template>
    </div>

    <div class="profile_section">
      <div class="caption profile_subtitle"> Специализации <ui-description-icon title="Что такое специализации?" body="Свои специализации (навыки) можно указать в настройках профиля. Другие авторизованные пользователи могут подтверждать Ваши навыки, зайдя к Вам в профиль и нажав на навык."/></div>
      <template v-if="user.specializations && user.specializations.length">
        <div class="profile_skills">
          <button class="skill" v-for="specialization in user.specializations" :key="specialization.id" :data-skill-id="specialization.id">{{specialization.name}}<span class="skill_counter">0</span></button>
        </div>
      </template>
      <template v-else>
        <span class="muted">Деректер көрсетілмеген</span>
      </template>
    </div>

    <div class="profile_section">
      <div class="caption profile_subtitle">
        Работа
      </div>

      <template v-if="showJob">
        <div class="dtable dtable-justify">
          <div class="dtable_row" v-if="user.job.name">
            <div class="dtable_col dtable_col-muted dtable_col-4">Место работы</div>
            <div class="dtable_col dtable_col-4">{{user.job.name}}</div>
          </div>

          <div class="dtable_row" v-if="user.job.domain">
            <div class="dtable_col dtable_col-muted dtable_col-4">Сфера</div>
            <div class="dtable_col dtable_col-4">{{user.job.domain}}</div>
          </div>

          <div class="dtable_row" v-if="user.job.position">
            <div class="dtable_col dtable_col-muted dtable_col-4">Должность</div>
            <div class="dtable_col dtable_col-4">{{user.job.position}}</div>
          </div>

          <div class="dtable_row" v-if="user.job.start_date">
            <div class="dtable_col dtable_col-muted dtable_col-4">Начало работы</div>
            <div class="dtable_col dtable_col-4">{{user.job.start_date| moment('YYYY')}}</div>
          </div>

          <div class="dtable_row" v-if="user.job.link">
            <div class="dtable_col dtable_col-muted dtable_col-4">Сайт компании</div>
            <div class="dtable_col dtable_col-4"><a :href="user.job.link" target="_blank">{{user.job.link}}</a></div>
          </div>
        </div>
      </template>
      <template v-else>
        <span class="muted">Деректер көрсетілмеген</span>
      </template>
    </div>

    <div class="profile_section">
      <div class="caption profile_subtitle">
        Контакты
      </div>

      <template v-if="contacts && contacts.length">
        <div class="profile_contacts" >
          <a v-for="contact in contacts" :key="contact.type" :href="contact.link" :class="contact.icon" target="_blank" class="profile_contact">{{contact.label}}</a>
        </div>
      </template>
      <template v-else>
        <span class="muted">Деректер көрсетілмеген</span>
      </template>
    </div>
  </div>
</template>
<script>
  import {normalizeContact} from '../../_services/normalizers'
  import UiDescriptionIcon from '../../components/ui/UiDescriptionIcon'

  export default {
    components: {UiDescriptionIcon},
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    computed: {
      contacts() {
        if (this.user.contacts) {
          return Object.keys(this.user.contacts).map(key => (
            {type: key, value: this.user.contacts[key]}
          )).map(c => normalizeContact(c));
        } else {
          return [];
        }
      },
      showJob() {
        return ['name', 'domain', 'position', 'link', 'start_date'].findIndex(key => !!this.user.job[key]) !== -1
      }
    }
  }
</script>
