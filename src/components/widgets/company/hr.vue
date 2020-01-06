<template>
<div class="company__hr" :class='{"company__hr--big": big === true}'>
    <div class="company__hr-cv">
        <div class="company__hr-photo">
            <img v-if="hr.photo !== null" :src="require('@/assets/img/people/'+hr.photo+'.jpg')" :srcset="require('@/assets/img/people/'+hr.photo+'@2x.jpg')+' 2x'" />
            <img v-else :src="require('@/assets/img/people/empty.svg')" :srcset="require('@/assets/img/people/empty.svg')+' 2x'" />
        </div>
        <div class="company__hr-info">
            <div class="company__hr-name" v-html="hr.name"></div>
            <div class="company__hr-position" v-html="hr.position"></div>
            <div class="company__hr-contacts">
                <div class="company__hr-contact" v-for="(item, index) in hr.contacts" :key="index"><a :href="'tel:'+item.value" v-html="item.value" v-if="item.type === 'phone'"></a><a :href="'mailto:'+item.value" v-html="item.value" v-if="item.type === 'email'"></a></div>
            </div>
        </div>
    </div>
    <button class="company__hr-ask" @click="handleClick">Задать вопрос HR компании</button>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import hrQuestion from '@/components/vacancy/popup/hr-question.vue'

export default {
    props: {
        hr: {
            type: Object,
            default: () => {}
        },
        big: {
            type: Boolean,
            default: false
        }
    },
    methods: {
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
        }

        &-position {
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            line-height: 22px;
            color: #656565;
            margin: 0 0 30px;
        }

        &-contacts {
            margin: 0 0 30px;
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

            @include mobile {
              padding: 14px;
            }
        }
    }
}
</style>
<style lang="scss">
.company {
    &__hr {
        &--big {
			display: grid;
			grid-template-columns: 63px 1fr;
			grid-template-rows: repeat(2, auto);
			grid-column-gap: 20px;
			grid-row-gap: 32px;

			@include mobile {
				display: grid;
				grid-template-columns: 63px 1fr;
				grid-template-rows: auto auto;
				grid-column-gap: 20px;
				grid-row-gap: 30px;
			}

			&::before {
				left: 0!important;
				width: 100%!important;

				@include mobile {
					left: -20px!important;
					width: calc(100% + 40px)!important;
				}
			}

            .company {
                &__hr {
                    display: grid;
                    grid-template-columns: 63px 1fr;
                    grid-template-rows: repeat(2, auto);
                    grid-column-gap: 20px;
                    grid-row-gap: 0px;


					&-cv {
						grid-area: 1 / 1 / 2 / 3;
					}

					&-ask {
						grid-area: 2 / 2 / 3 / 3;
						width: fit-content;
						padding: 14px 36px;

						@include tablet {
							grid-area: 2 / 1 / 3 / 3;
							justify-self: center;
						}

						@include mobile {
							grid-area: 2 / 1 / 3 / 3;
              padding: 14px;
              width: 100%;
						}
					}

					&-info {
						display: grid;
						grid-template-columns: 227px auto;
						grid-template-rows: repeat(2, auto);
						grid-column-gap: 60px;
						grid-row-gap: 5px;

						@include tablet {
							grid-template-columns: 1fr 1fr;
							align-items: center;
							grid-template-rows: repeat(2, auto);
						}

						@include mobile {
							grid-template-columns: 1fr;
							grid-template-rows: repeat(2, 29px) auto;
							grid-column-gap: 0px;
							grid-row-gap: 5px;
						}
					}

					&-name {
						grid-area: 1 / 1 / 2 / 3;
						margin: 0;
						align-self: end;

						@include tablet {
							grid-area: 1 / 1 / 2 / 2;
						}

						@include mobile {
							grid-area: initial;
						}
					}

					&-position {
						margin: 0;
						align-self: start;

						@include tablet {
							grid-area: 2 / 1 / 3 / 2;
						}
					}

					&-contacts {
						display: flex;
						margin: 0;

						@include tablet {
							grid-area: 1 / 2 / 3 / 3;
							flex-direction: column;
							align-items: flex-end;
						}

						@include mobile {
							flex-direction: column;
						}
					}

					&-contact:not(:last-child) {
						margin: 0 60px 0 0;

						@include tablet {
							margin: 0 0 0 10px;
						}
					}
                }

            }
        }
    }
}
</style>
