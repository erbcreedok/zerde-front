<template>
  <div>
    <form class="form" @submit.prevent="handleFormSubmit">
      <div class="profile_section">
        <div class="caption profile_subtitle">Имя</div>
        <ui-input-field class="form_field textfield-block" v-model="userData.firstname" translate capitalize label="firstname" name="firstname" required show-required/>
        <ui-input-field class="form_field textfield-block" v-model="userData.lastname" translate capitalize label="lastname" name="lastname" required show-required/>
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">Фотография</div>
        <div class="form_field">
          <label class="fileinput">
            <span class="fileinput_message">
              <template v-if="avatar">Файл: {{avatar.name}}</template>
            </span>
            <div type="button" class="fileinput_button button button-small button-primary button-outline button-icon button-icon-left button-icon-upload">Загрузить фото</div>
            <input @change="handleImageInput" class="fileinput_input" accept="image/jpeg, image/png" type="file">
            <input type="hidden" class="fileinput_id" name="fields[user_photo]" value="">
          </label>
        </div>
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">Статус</div>
        <ui-input-field class="form_field textfield-block" max-length="45" v-model="userData.status" :label="`Статус (${$t('{val} symbol ::: {val} symbols', {val: 45}, 45)})`| capitalize" name="status"/>
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">О себе</div>
        <ui-textarea rows="4"
                     v-model="userData.about"
                     max-length="240"
                     name="about"
                     class="textfield-block form_field"
                     capitalize
                     :label="`напишите текст о себе (${$t('max {val}', {val: $t('{val} symbol ::: {val} symbols', {val: 240}, 240)})})`"
        />
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">Специализации</div>
        <div class="profile_skills">
          <input type="hidden" name="specializations" :value="userData.specializations">
          <button type="button" class="skill" v-for="(specialization, index) in selectedSpecializations" :key="specialization.id">
            {{specialization.name}}
            <span class="skill_remove" data-tooltip="удалить" data-tooltip-position="top" @click="removeSpecialization(index)"></span>
          </button>
        </div>
        <ui-auto-complete placeholder="Начните вводить название специализации" v-model="specialization" :options="specializationOptions" @input="addSpecialization"  class="textfield-block form_field"/>
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">Основная информация</div>
        <ui-input-field mask="##.##.####" placeholder="ДД.ММ.ГГГГ" class="textfield-block form_field" label="День рождения" name="birth_date" v-model="userData.birth_date"/>
        <ui-input-field placeholder="Укажите ссылку" class="textfield-block form_field" label="Личный сайт" name="site" v-model="userData.site"/>
        <ui-select-field label="Регион" :options="regionOptions" v-model="userData.region_id" name="region_id" class="textfield-block form_field"/>
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">Работа</div>
        <ui-input-field label="Место работы" v-model="jobData.name" class="textfield-block form_field"/>
        <ui-select-field label="Сфера" :options="domainOptions" v-model="jobData.domain_id" name="domain_id" class="textfield-block form_field"/>
        <ui-input-field label="Должность" v-model="jobData.position" class="textfield-block form_field"/>
        <ui-input-field label="Начало работы" v-model="jobData.start_date" mask="##.##.####" placeholder="ДД.ММ.ГГГГ" class="textfield-block form_field"/>
        <ui-input-field label="Сайт компании" v-model="jobData.site" class="textfield-block form_field"/>
      </div>
      <div class="profile_section">
        <div class="caption profile_subtitle">Контакты</div>
        <ui-input-field label="Телефон" v-model="contactsData.phone" mask="+#(###)###-##-##" class="textfield-block form_field"/>
        <ui-input-field label="Instagram" v-model="contactsData.instagram"  class="textfield-block form_field"/>
        <ui-input-field label="Telegram" v-model="contactsData.telegram"  class="textfield-block form_field"/>
        <ui-input-field label="Skype" v-model="contactsData.skype"  class="textfield-block form_field"/>
        <ui-input-field label="Vk" v-model="contactsData.vk"  class="textfield-block form_field"/>
        <ui-input-field label="Facebook" v-model="contactsData.facebook"  class="textfield-block form_field"/>
      </div>
      <button type="submit" class="form_button button button-primary">
        <template v-if="uploadStatus!=='loading'">Сохранить</template>
        <template v-else>
          <span style="display: inline-block; width: 100px">
            <pulse-loader loading color="white" size="10px"/>
          </span>
        </template>
      </button>
    </form>
  </div>
</template>
<script>
  import moment from 'moment';
  import UiInputField from '../../components/ui/UiInputField';
  import UiTextarea from '../../components/ui/UiTextarea';
  import optionsService from '../../_services/options.service';
  import UiSelectField from '../../components/ui/UiSelectField';
  import UiAutoComplete from '../../components/ui/UiAutoComplete';
  import userService from '../../_services/user.service';
  import {normalizeUserProfileForm} from "../../_services/normalizers";
  import {capitalize} from "../../_filters/capitalize";
  import PulseLoader from 'vue-spinner/src/PulseLoader'
  import {requireOwnAuth} from '../../router/router-guards'
  export default {
    components: {PulseLoader, UiAutoComplete, UiSelectField, UiTextarea, UiInputField},
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        userData: {...this.user},
        jobData: {...this.user.job},
        contactsData: {...this.user.contacts},
        avatar: null,
        regionOptions: [],
        domainOptions: [],
        specializationOptions: [],
        specialization: null,
        uploadStatus: 'clean',
      }
    },
    computed: {
      selectedSpecializations() {
        if (this.userData.specializations.length) {
          return this.userData.specializations;
        }
        return [];
      },
    },
    methods: {
      loadRegionOptions() {
        optionsService.getRegions().then(data => {
          this.regionOptions = data;
        });
      },
      loadSpecializationsOptions() {
        optionsService.getSpecializations().then(data => {
          this.specializationOptions = data;
        });
      },
      loadDomainsOptions() {
        optionsService.getDomains().then(data => {
          this.domainOptions = data;
        });
      },
      addSpecialization(specialization) {
        this.userData.specializations.push(specialization );
        this.specializationOptions = this.specializationOptions.map(op => {
          if (op.id === specialization.id) {
            op.disabled = true;
          }
          return op
        });
        this.$nextTick(() => {
          this.specialization = null;
        });
      },
      removeSpecialization(index) {
        this.userData.specializations.splice(index, 1);
      },
      handleImageInput(e) {
        const files = e.target.files;
        console.log(files);
        if (files[0]) {
          this.avatar = files[0];
          if (this.avatar.size > 2 * 1024 * 1024) {
            this.$notyf.error({
              message: capitalize(this.$t('image max size is {val} kB', {val: 2})),
            });
            this.avatar = null;
          }
        }
      },
      handleFormSubmit() {
        let data = new FormData();
        Object.keys(this.userData).forEach((key) => {
          if (this.userData[key]!==null && this.userData[key]!==undefined) {
            data.set(key, this.userData[key]);
          }
        });
        Object.keys(this.jobData).forEach((key) => {
          data.delete('job');
          if (this.jobData[key]!==null && this.jobData[key]!==undefined) {
            data.set(`job[${key}]`, this.jobData[key]);
          }
          if (this.jobData.start_date) {
            data.set(`job[start_date]`, moment(this.jobData.start_date,'DD.MM.YYYY').format('YYYY-MM-DD'));
          }
        });
        data.set('contacts', JSON.stringify(this.contactsData));
        data.set('specializations', JSON.stringify(this.userData.specializations.map(s => s.id)));
        if (this.userData.birth_date) {
          data.set('birth_date', moment(this.userData.birth_date,'DD.MM.YYYY').format('YYYY-MM-DD'));
        }
        if (this.userData.region_id) {
          data.set('region_id', this.userData.region_id);
        }
        if (this.avatar) {
          data.set('avatar', this.avatar);
        } else {
          data.delete('avatar');
        }
        data = normalizeUserProfileForm(data);
        this.uploadStatus = 'loading';
        userService.updateProfile(data).then(message => {
          this.uploadStatus = 'success';
          this.$emit('updateProfile');
          this.$notyf.success({
            message: capitalize(this.$t(message.toLowerCase())),
          });
        }).catch(() => {
          this.uploadStatus = 'error';
          this.$notyf.error({
            message: capitalize(this.$t('error occurred while uploading form')),
          });
        });
      },
    },
    mounted() {
      this.loadRegionOptions();
      this.loadSpecializationsOptions();
      this.loadDomainsOptions();
    },
    beforeRouteEnter: requireOwnAuth
  }
</script>
