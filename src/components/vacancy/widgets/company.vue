<template lang='pug'>
.company__widget
  .company__widget-head
    company-logo.company__logo
      img(:src='require("@/assets/img/company/logo/"+company.logo+".jpg")' :srcset='require("@/assets/img/company/logo/"+company.logo+"@2x.jpg")+" @2x"')
    .company__short-info
      h2.company__title(v-html='company.name')
      a.company__url(v-if='company.contacts.url != null' :href='company.contacts.url' v-html='company.contacts.url')
    button.company__widget-chevron(@click="toggleDesc" v-if="!isMobile" :class="{'company__widget-chevron--rotated': isShow && !isMobile}")
      img(:src='require("@/assets/img/arrow.svg")')
  transition(name="slide")
    .company__widget-body(v-if="(isShow && isMobile) || (!isShow && isMobile)")
      p.company__adress(v-if='company.contacts.adress != null' v-html='company.contacts.adress')
      employees(:count='company.info.employees')
      p.company__about(v-html='company.info.about')
      a.company__more(href='#') Подробнее о компании
      .company__hr
        .company__hr-cv
          .company__hr-photo
            img(v-if='company.hr.photo !== null' :src='require("@/assets/img/people/"+company.hr.photo+".jpg")' :srcset='require("@/assets/img/people/"+company.hr.photo+"@2x.jpg")+" 2x"')
            img(v-else :src='require("@/assets/img/people/empty.svg")' :srcset='require("@/assets/img/people/empty.svg")+" 2x"')
          .company__hr-info
            .company__hr-name(v-html='company.hr.name')
            .company__hr-position(v-html='company.hr.position')
            .company__hr-contacts
              .company__hr-contact(v-for='(item, index) in company.hr.contacts' :key='index')
                a(:href='"tel:"+item.value' v-html='item.value' v-if='item.type === "phone"')
                a(:href='"mailto:"+item.value' v-html='item.value' v-if='item.type === "email"')
        button.company__hr-ask(@click='handleClick') Задать вопрос HR компании
</template>

<script>
  import {mapActions} from 'vuex'
	import employees from '@/components/widgets/company/employees.vue'
	import logo from '@/components/widgets/company/logo.vue'
  import hrQuestion from '@/components/vacancy/popup/hr-question.vue'
	export default {
		props: {
			company: {
				type: Object,
				default: []
			},
		},
		components: {
			employees,
      'company-logo': logo
		},
    data () {
		  return {
		    isShow: false
      }
    },
    methods: {
      toggleDesc () {
        this.isShow = !this.isShow
      },
      handleClick () {
        this.showOverlay()
        this.popup({
          title: 'Задать вопрос HR',
          desc: 'Оставьте свои контакты и наш менеджер свяжется с вами в ближайшее время.',
          content: hrQuestion
        })
      },
      ...mapActions({
        popup: 'popup/popup',
        showOverlay: 'overlay/show'
      })
    }
	}
</script>

<style lang="scss" scoped>
.company {
  &__about {
    @include tablet {
      order: 1;
      margin-top: 30px;
    }

    @include mobile {
      order: 1;
      margin-top: 30px;
    }
  }

  &__employees {
    @include tablet {
      order: 4;
      margin: 20px 0 40px;
    }

    @include mobile {
      order: 4;
      margin: 20px 0 30px;
    }
  }

	&__widget {
		position: relative;
		width: 373px;
		background: #FFFFFF;
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
		border-radius: 32px;
		padding: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 0 30px;
		z-index: 2;

    @include tablet {
      width: 100%;
      margin: 0;
    }

    @include mobile {
      width: 100%;
      padding: 30px 20px;
      margin: 0;
    }

    &-head {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      @include tablet {
        flex-direction: row;
      }

      @include mobile {
        flex-direction: row;
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;

      @include tablet {
        align-items: unset;
      }

      @include mobile {
        align-items: unset;
      }
    }

    &-chevron {
      margin-left: auto;
      background: #F8FAFD;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;

      & > img {
        transform: rotateZ(90deg);
      }

      &--rotated {
         img {
          transform: rotateZ(270deg);
        }
      }
    }
	}

  &__title {

  }

  &__short-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    @include tablet {
      margin-top: unset;
      margin-left: 30px;
      align-items: unset;
    }

    @include mobile {
      margin-top: unset;
      margin-left: 20px;
      align-items: unset;
    }
  }

	&__more {
		font-style: normal;
		font-weight: normal;
		font-size: 15px;
		line-height: 22px;
		text-decoration-line: underline;
		color: #353535;
		align-self: flex-start;
		margin: 20px 0 30px;

    @include tablet {
      order: 2;
      margin: 10px 0 20px;
    }

    @include mobile {
      order: 2;
      margin: 10px 0 20px;
    }
	}

  &__adress {
    margin-top: 15px;

    @include tablet {
      order: 3;
      margin-top: 20px;
    }

    @include mobile {
      order: 3;
      margin-top: 0;
    }
  }

	&__hr {
		position: relative;
		width: 100%;
		padding: 30px 0 0;
		&::before {
			content: '';
			width: calc(100% + 60px);
			height: 1px;
			background: #E5E5E5;
			top: 0;
			left: -30px;
			position: absolute;

      @include mobile {
        width: calc(100% + 40px);
        left: -20px;
      }
		}

    @include tablet {
      order: 5;
    }

    @include mobile {
      order: 5;
    }

    &-info {
      @include tablet {
        display: grid;
        grid-template-columns: 1fr 1fr
      }
    }

		&-cv {
			display: grid;
			grid-template-columns: 63px 1fr;
			grid-template-rows: auto;
			grid-column-gap: 20px;
			grid-row-gap: 0px;
		}
		&-photo {
			img {
				width: 63px;
			}
		}
		&-name {
			font-style: normal;
			font-weight: 500;
			font-size: 15px;
			line-height: 22px;
			color: #353535;
			margin: 6px 0 5px;

      @include tablet {
        grid-row-start: 1;
        grid-column-start: 1;
        grid-column-end: 3;
      }
		}
		&-position {
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 22px;
			color: #656565;
			margin: 0 0 30px;

      @include tablet {
        grid-column-start: 1;
        grid-column-end: 3;
      }
		}
		&-contacts {
			margin: 0 0 30px;

      @include tablet {
        grid-row-start: 1;
        grid-row-end: 4;
      }
		}
		&-contact {
			a {
				display: block;
				font-style: normal;
				font-weight: 500;
				font-size: 15px;
				line-height: 22px;
				color: #353535;
				text-decoration: none;
			}
			&:not(:last-child) {
				margin: 0 0 10px;
			}
		}
		&-ask {
			width: 100%;
			text-align: center;
			background: #E0E6EE;
			border-radius: 6px;
			padding: 14px 30px;
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			line-height: 22px;
			color: #353535;
			text-decoration: none;
			display: block;
      border: none;
      outline: none;

      @include mobile{
        padding: 14px;
      }
		}
	}
}
</style>
