<template lang='pug'>
  html
    body
      .vacancy
        .vacancy__image(v-if='vacancy.image != null', :style='"background-image: url("+require("@/assets/img/bg/"+vacancy.image+"@2x.jpg")+");"')
        .vacancy__inner
          .vacancy__content
            .vacancy__header
              .vacancy__header-top
                h1.vacancy__title(v-html='vacancy.title')
                toggle-switch(:first-variant='"ru"' :second-variant='"en"')
              .vacancy__header-bottom
                span.vacancy__salary(v-if='vacancy.salary.min === null && vacancy.salary.max === null && vacancy.salary.fix === null') По результатам собеседования
                span.vacancy__salary(v-else-if='vacancy.salary.min !== null && vacancy.salary.max === null') от {{vacancy.salary.min}} ₽
                span.vacancy__salary(v-else-if='vacancy.salary.min !== null && vacancy.salary.max !== null') от {{vacancy.salary.min}} до {{vacancy.salary.max}} ₽
                span.vacancy__salary(v-else-if='vacancy.salary.min === null && vacancy.salary.max !== null && vacancy.salary.fix === null') до {{vacancy.salary.max}} ₽
                span.vacancy__salary(v-else-if='vacancy.salary.min === null && vacancy.salary.max === null && vacancy.salary.fix !== null') {{vacancy.salary.fix}} ₽
            .vacancy__text
              .vacancy__text-item(v-for='(item, index) in vacancy.content', :key='index')
                h3.vacancy__text-title(v-html='item.title')
                p.vacancy__text-p(v-html='item.content')
            .vacancy__request
              p.vacancy__request-text Уведомление уйдет на почту работодателя, вы получите ответ как только ваше резюме будет рассмотрено.
              .vacancy__request-controls
                button.vacancy__request-button(@click='handleClick') Подать заявку на вакансию
            other-widget(:vacancies='other')
          .vacancy__sidebar
            company-widget(:company='company', :class='{ "vacancy__sidebar--up": vacancy.image != null }')

</template>

<script>
  import {mapActions} from 'vuex'
	import company from '@/components/vacancy/widgets/company.vue'
	import request from '@/components/vacancy/popup/request.vue'
	import other from '@/components/widgets/company/other.vue'
	import toggleSwitch from '@/components/global/toggle-switch.vue'
	export default {
		components: {
			'company-widget': company,
			'other-widget': other,
      'toggle-switch': toggleSwitch
		},
		props: {
			vacancy: {
				type: Object,
				default: []
			},
			company: {
				type: Object,
				default: []
			},
			other: {
				type: Array,
				default: {}
			},
		},
    methods: {
      handleClick () {
        this.showOverlay()
        this.popup({
          title: 'Подать заявку',
          desc: 'Оставьте свои контакты и наш менеджер свяжется с вами в ближайшее время.',
          content: request
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
.vacancy {

	&__image {
		width: calc(100% - 60px);
		height: 300px;
		margin: 30px;
		background: #EDEDED;
		border-radius: 32px;
		background-size: cover;
		background-position: center;

    @include tablet {
      width: calc(100% - 40px);
      margin: 20px;
      height: 209px;
    }

    @include mobile {
      width: calc(100% - 20px);
      margin: 10px;
      height: 209px;
    }
	}
	&__inner {
		display: grid;
		grid-template-columns: auto 727px 373px auto;
		grid-template-rows: auto;
		grid-column-gap: 30px;
		grid-row-gap: 0px;

    @include tablet {
      grid-template-columns: 1fr;
      grid-row-gap: 10px;
      width: 688px;
      margin: 0 auto;
    }

    @include mobile {
      grid-template-columns: 1fr;
      grid-row-gap: 10px;
      width: 335px;
      margin: 0 auto;
    }
	}


	&__content {
		grid-area: 1 / 2 / 2 / 3;
		margin: 0 0 103px;

    @include tablet {
      grid-area: unset;
      padding: 30px;
      margin: -50px 0 0;
    }

    @include mobile {
      grid-area: unset;
      padding: 30px 10px;
      margin: 0;
    }
	}
	&__sidebar {
		grid-area: 1 / 3 / 2 / 4;
		&--up {
			margin-top: -180px!important ;

      @include tablet {
        margin-top: -130px!important;
      }

      @include mobile {
        margin-top: -60px!important;
      }
		}

    @include tablet {
      grid-area: unset;
      grid-row: 1;
      padding: 40px;

    }

    @include mobile {
      grid-area: unset;
      grid-row: 1;
      display: flex;
      justify-content: center;
    }
	}
	&__header {
		padding: 20px 0 30px;

    @include tablet {
      padding: 20px 40px 30px;
    }

    &-top {
      display: flex;
      align-items: center;
      margin: 0 0 18px;
      justify-content: space-between;
    }
	}
	&__title {
		font-style: normal;
		font-weight: 600;
		font-size: 32px;
		line-height: 38px;
		color: #000000;

    @include tablet {
      font-size: 24px;
      line-height: 29px;
    }

    @include mobile {
      font-size: 24px;
      line-height: 29px;
    }
	}
	&__salary {
		font-style: normal;
		font-weight: 300;
		font-size: 32px;
		line-height: 37px;
		color: #000000;
		margin: 0;

    @include tablet {
      font-size: 24px;
      line-height: 28px;
    }

    @include mobile {
      font-size: 24px;
      line-height: 28px;
    }
	}
	&__text {
		padding: 50px 0;
		margin: 0 0 50px;
		position: relative;

    @include tablet {
      padding: 30px 40px;
      margin: 0 0 30px;
    }

    @include mobile {
      padding: 30px 0px;
      margin: 0 0 30px;
    }

		&::before {
			content: '';
			width: calc(100% + 80px + 373px + 50px);
			height: 100%;
			top: 0;
			left: -50px;
			position: absolute;
			background: #F8FAFD;
			border-radius: 16px;

      @include tablet {
        width: 100%;
        left: 0;
      }
      @include mobile {
        width: calc(100% + 40px);
        left: -20px;
      }
		}
		&-item {
			position: relative;
			z-index: 1;
			&:not(:last-child) {
				margin: 0 0 40px;
			}
		}
		&-title {
			font-style: normal;
			font-weight: normal;
			font-size: 22px;
			line-height: 22px;
			color: #000000;
			margin: 0 0 20px;

      @include tablet {
        font-size: 20px;
      }

      @include mobile {
        font-size: 20px;
      }
		}
		&-p {
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 22px;
			color: #353535;
			margin: 0;
			max-width: 600px;
		}
	}
	&__request {
		margin: 0 0 50px;
		&-text {
			font-style: normal;
			font-weight: 500;
			font-size: 15px;
			line-height: 22px;
			color: #353535;
			max-width: 690px;
			margin: 0 0 20px;

      @include tablet {
        text-align: center;
        font-weight: 400;
        max-width: unset;
      }

      @include mobile {
        text-align: center;
        font-weight: 400;
        max-width: unset;
      }
		}
		&-button {
			display: inline-block;
			background: #3DD498;
			border-radius: 6px;
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 22px;
			color: #FFFFFF;
			padding: 14px 50px;
			text-decoration: none;
      text-align: center;
      outline: none;
      border: none;

      @include mobile {
        padding: 14px;
        width: 100%;
        height: 50px;
      }
		}

    &-controls {
      @include tablet {
        display: flex;
        justify-content: center;
      }
    }
	}
}
</style>
