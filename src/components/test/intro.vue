<template>
	<div class="test__intro">
		<div class="test__intro-image"></div>
		<div class="test__intro-inner">
			<div class="test__intro-blank"></div>
			<div class="test__intro-logo">
				<logo/>
			</div>
			<div class="test__intro-title">
				<h1 class="company__title" v-html="test.company.name"></h1>
				<a class="company__url" v-if='test.company.contacts.url != null' :href='test.company.contacts.url' v-html='test.company.contacts.url'></a>
			</div>
			<div class="test__intro-content">
				<h2 class="test__intro-heading" v-html='test.intro.title'></h2>
				<p class="test__intro-lead" v-html='test.intro.lead'></p>
				<a @click="startTest()" class="test__intro-button" v-html='test.intro.button'></a>
			</div>
			<div class="test__intro-blank"></div>
		</div>
		<div class="test__intro-footer">
			<div class="test__intro-blank"></div>
			<div class="test__intro-footer-logo">
				<img :src="require('@/assets/img/logo-inv.svg')"/>
			</div>
			<div class="test__intro-blank"></div>
		</div>
	</div>
</template>

<script>
	import logo from '@/components/widgets/company/logo.vue'
	export default {
		components: {
			logo,
		},
		props: {
			test: {
				type: Object,
				default: function () {
				    return {
                        intro: {
                            title: 'Работодатель просит пройти онлайн тестирование.',
                            lead: 'Онлайн тестирование состоит из 10 вопросов общей продолжительностью 9 минут 30 секунд. Внимательно прочитайте вопрос и выберите один или несколько вариантов ответов. Обратите внимание, что у каждого вопроса есть таймер ограничения по времени. По окончанию прохождения тестирования заполните свою анкету, чтобы работодатель увидел ваши ответы.',
                            button: 'Начать'
                        },
                        company: {
                            name: 'McDonald’s',
                            contacts: {
                                url: 'https://mcdonalds.ru'
                            }
                        }
                    }
				}
			},
		},
		methods: {
			startTest() {
				this.$parent.start = true;
				this.$parent.startTimer();
			}
		},
	}
</script>

<style lang="scss" scoped>
.test {
	&__intro {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 20px;

		@include tablet {
			grid-row-gap: 30px;
		}

		@include mobile {
			grid-row-gap: 16px;
		}

		&-image {
			margin: 30px;
			height: 300px;
			background: #EDEDED;
			border-radius: 32px;

			@include tablet {
				margin: 20px;
				border-radius: 16px;
				height: 209px;
        width: calc(100vw - 40px);
			}

			@include mobile {
				margin: 16px;
				border-radius: 16px;
				height: 209px;
        width: calc(100vw - 32px);
			}
		}

		&-inner {
			display: grid;
			grid-template-columns: auto 120px 340px 408px auto;
			grid-template-rows: auto;
			grid-column-gap: 40px;
			grid-row-gap: 0px;
			margin: 0 0 134px;

			@include tablet {
				grid-template-columns: auto 98px 500px auto;
				grid-template-rows: repeat(2, auto);
				grid-column-gap: 30px;
				grid-row-gap: 30px;
        width: 100vw;
			}

			@include mobile {
				grid-template-columns: auto 62px 233px auto;
				grid-template-rows: repeat(2, auto);
				grid-column-gap: 20px;
				grid-row-gap: 30px;
        width: 100vw;
        margin: 0 0 50px;
			}
		}

		&-footer {
			display: grid;
			grid-template-columns: auto 948px auto;
			grid-template-rows: auto;
			grid-column-gap: 40px;
			grid-row-gap: 0px;
			margin: 0 0 70px;

      @include tablet {
        grid-template-columns: auto 1fr auto;
      }

      @include mobile {
        grid-template-columns: auto 1fr auto;
      }

      &-logo {
        display: flex;

        @include tablet {
          justify-content: center;
        }

        @include mobile {
          justify-content: center;
        }
      }
		}

		&-logo {
			@include tablet {
				grid-area: 1 / 2 / 2 / 3;
			}
			@include mobile {
				grid-area: 1 / 2 / 2 / 3;
			}
		}

		&-title {
			padding: 28px 0 0;

			@include tablet {
				grid-area: 1 / 3 / 2 / 4;
				padding: 23px 0 0;
			}
			@include mobile {
				grid-area: 1 / 3 / 2 / 4;
				padding: 5px 0 0;
			}
		}

		&-content {
			@include tablet {
				grid-area: 2 / 2 / 3 / 4;
				padding: 20px 0 0;
        display: flex;
        flex-direction: column;
			}
			@include mobile {
				grid-area: 2 / 2 / 3 / 4;
				padding: 2px 0 0;
			}
		}

		&-heading {
			color: #ffffff;
			font-style: normal;
			font-weight: bold;
			font-size: 28px;
			line-height: 38px;
			letter-spacing: 0.16px;
			font-feature-settings: 'case' on;
			margin: 0 0 20px;

			@include tablet {
				margin: 0 0 30px;
        font-size: 28px;
        line-height: 38px;
			}

			@include mobile {
				font-size: 18px;
				line-height: 28px;
				margin: 0 0 32px;
			}
		}

		&-lead {
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 26px;
			letter-spacing: 0.04px;
			font-feature-settings: 'case' on;
			color: #939CA8;
			margin: 0 0 60px;

			@include mobile {
				font-size: 14px;
			}
		}

		&-button {
			display: inline-block;
			background: #3DD498;
			border-radius: 16px;
			padding: 14px 140px;
			text-decoration: none;
			color: #ffffff;
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			line-height: 22px;
			text-align: center;
			cursor: pointer;

      @include tablet {
        align-self: center;
      }

			@include mobile {
				padding: 14px;
				width: 100%;
			}
		}
	}
}
.company {
	&__title {
		color: #ffffff;

		@include tablet {
			margin: 0 0 10px;
		}

		@include mobile {
			margin: 0 0 7px;
		}
	}
}
</style>
