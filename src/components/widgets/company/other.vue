<template lang='pug'>
.other(:class='{"other--short": short === true}')
	.other__header(:class='{"other__header--noline": line === false}')
		h3.other__header-title Другие вакансии компании:
		a.other__header-button(href='#' v-html="allVacanciesLinkText")
	.other__items
		.other__item(v-for='(item, index) in vacancies' :key='index')
			.other__item-logo
				img(:src='require("@/assets/img/company/logo/"+item.logo+".jpg")' :srcset='require("@/assets/img/company/logo/"+item.logo+"@2x.jpg")+" @2x"')
			.other__item-title(v-html='item.title')
			.other__item-salary(v-if='item.salary.min === null && item.salary.max === null && item.salary.fix === null') По результатам собеседования
			.other__item-salary(v-else-if='item.salary.min !== null && item.salary.max === null') От {{item.salary.min | format}} ₽
			.other__item-salary(v-else-if='item.salary.min !== null && item.salary.max !== null') От {{item.salary.min | format}} ₽ до {{item.salary.max | format}} ₽
			.other__item-salary(v-else-if='item.salary.min === null && item.salary.max !== null && item.salary.fix === null') До {{item.salary.max | format}} ₽
			.other__item-salary(v-else-if='item.salary.min === null && item.salary.max === null && item.salary.fix !== null') {{item.salary.fix | format}} ₽
</template>

<script>
	export default {
		props: {
			vacancies: {
				type: Array,
				default: []
			},
			line: {
				type: Boolean,
				default: true
			},
			short: {
				type: Boolean,
				default: true
			},
		},
		filters: {
			format(value) {
				return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
			}
		},
    computed: {
      allVacanciesLinkText () {
        return (this.isMobile) ? 'Все' : 'Все вакансии компании'
      }
    }
	}
</script>

<style lang="scss" scoped>
.other {
	&--short {
		width: 695px;

		@include tablet {
			width: initial;
		}
		@include mobile {
			width: initial;
		}
	}
	&__header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30px 0;
		@include tablet {
/*			padding: 50px 0 30px;*/
      padding: 0;
		}
    @include mobile {
      padding: 0;
    }

		&::before {
			content: '';
			width: calc(100% + 32px);
			height: 1px;
			background: #E5E5E5;
			top: 0;
			left: -32px;
			position: absolute;

      @include tablet {
        display: none;
      }

      @include mobile {
        display: none;
      }
		}
		&--noline {
			&::before {
				content: none;
			}
		}
		&-title {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 22px;
			color: #000000;
		}
		&-button {
			position: relative;
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 22px;
			color: #3DD498;
			text-decoration: none;
      display: flex;
      align-items: center;

			@include tablet {
				padding-right: 40px;
			}

			@include mobile {
				// padding: 0 47px 0 0;
			}

			&::after {
				content: '';
				width: 8px;
				height: 13px;
        margin-left: 6px;
				background: url('/assets/img/arrow.svg');
			}
		}
	}
	&__items {
		display: flex;
		flex-direction: column;
    margin-top: 30px;
	}
	&__item {
		position: relative;
		display: grid;
		grid-template-columns: 54px 1fr auto;
		grid-template-rows: auto;
		grid-column-gap: 20px;
		grid-row-gap: 0px;
		align-items: center;
		padding: 15px 40px 15px 30px;
		margin: 0 0 0 -30px;
		cursor: pointer;

		@include mobile {
			grid-template-columns: 54px 1fr;
			grid-template-rows: repeat(2, 22px);
			grid-column-gap: 20px;
			grid-row-gap: 10px;
			margin: 0 -20px 0 -20px;
		}

		&-logo {
			img {
				width: 54px;
			}
			@include mobile {
				grid-area: 1 / 1 / 3 / 2;
			}
		}
		&-title {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 22px;
			color: #000000;

			@include mobile {
				grid-area: 1 / 2 / 2 / 3;
			}
		}
		&-salary {
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 22px;
			color: #353535;

			@include mobile {
				grid-area: 2 / 2 / 3 / 3;
			}
		}
		&::after {
			content: '';
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			position: absolute;
			border-radius: 16px;
			opacity: 0;
		}
		&:hover {
			&::after {
				background: #3DD498;
				opacity: 0.05;
			}
		}
	}
}
</style>
