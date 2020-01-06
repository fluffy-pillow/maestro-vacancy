<template>
<div class="company">
    <div class="company__image" v-if='company.image != null' :style='"background-image: url("+require("@/assets/img/bg/"+company.image+"@2x.jpg")+");"'></div>
    <div class="company__inner">
        <div class="company__logo">
            <widget-logo />
        </div>
        <div class="company__header">
            <h1 class="company__title" v-html="company.name"></h1>
            <a class="company__url" v-if='company.contacts.url != null' :href='company.contacts.url' v-html='company.contacts.url'></a>
        </div>
        <div class="company__employees">
            <widget-employees :count='company.info.employees' />
        </div>
        <p class="company__adress" v-if='company.contacts.adress != null' v-html='company.contacts.adress'></p>
        <div class="company__description">
            <p class="company__about" v-html='company.info.aboutBig' v-hide-on-mobile></p>
            <p class="company__about" v-html='company.info.about' v-hide-on-desktop></p>
        </div>
        <div class="company__photos" v-if="company.photos !== null">
            <div class="company__photo" v-for="(item, index) in company.photos" :key='index' :style='"background-image: url("+require("@/assets/img/gallery/"+item.img+".jpg")+");"'></div>
        </div>
        <div class="company__hr-long">
            <widget-hr :hr='company.hr' :big='true' />
        </div>
        <div class="company__vacancies">
            <widget-vacancies :vacancies="vacancies" :line="false" :short='false' />
        </div>
    </div>
</div>
</template>

<script>
import logo from '@/components/widgets/company/logo.vue'
import employees from '@/components/widgets/company/employees.vue'
import hr from '@/components/widgets/company/hr.vue'
import other from '@/components/widgets/company/other.vue'
export default {
    components: {
        'widget-employees': employees,
        'widget-hr': hr,
        'widget-vacancies': other,
        'widget-logo': logo,
    },
    props: {
        company: {
            type: Object,
            default: []
        },
        vacancies: {
            type: Array,
            default: {}
        },
    },
}
</script>

<style lang="scss" scoped>
.company {
    display: grid;
    grid-template-columns: auto 1160px auto;
    grid-template-rows: auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    min-height: 995px;

    @include tablet {
        grid-template-columns: auto 688px auto;
    }

    @include mobile {
        grid-template-columns: auto 335px auto;
    }

    &__about {
      padding: 0 20px;
    }

    &__image {
        position: absolute;
        width: calc(100% - 60px);
        height: 935px;
        margin: 30px;
        background: #EDEDED;
        border-radius: 32px;
        background-size: cover;
        background-position: center;
        z-index: -1;

        @include tablet {
            width: calc(100% - 40px);
            height: 209px;
            margin: 20px;
            border-radius: 16px;
        }

        @include mobile {
            width: calc(100% - 20px);
            margin: 10px;
            height: 209px;
        }
    }

    &__inner {
        position: relative;
        grid-area: 1 / 2 / 2 / 3;
        padding: 30px 90px 45px 50px;
        margin: 290px 0 97px;
        display: grid;
        grid-template-columns: 120px 1fr auto;
        grid-template-rows: 120px repeat(5, auto);
        grid-column-gap: 40px;
        grid-row-gap: 30px;

        @include tablet {
            padding: 30px;
            margin: 182px 0 35px;
            grid-template-columns: 98px 1fr;
            grid-template-rows: 98px repeat(6, auto);
            grid-column-gap: 30px;
            grid-row-gap: 20px;
        }

        @include mobile {
            margin: 170px 0 0;
            padding: 30px 0px 22px;
            grid-template-columns: 62px 1fr;
            grid-template-rows: 62px repeat(6, auto);
            grid-column-gap: 20px;
            grid-row-gap: 20px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
            border-radius: 32px;
            z-index: -1;

            @include tablet {
                height: calc(100% - 380px);
            }

            @include mobile {
                height: calc(100% - 380px);
            }
        }
    }

    &__logo {
        grid-area: 1 / 1 / 2 / 2;

      @include mobile {
        margin-left: 10px;
      }
    }

    &__sidebar {
        grid-area: 1 / 1 / 4 / 2;

        @include tablet {
            grid-area: 1 / 1 / 2 / 2;
        }
    }

    &__header {
        grid-area: 1 / 2 / 2 / 3;
        // padding: 28px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @include tablet {
            grid-area: 1 / 2 / 2 / 3;
        }

        @include mobile {
            grid-area: 1 / 2 / 2 / 3;
            padding-right: 10px;
            padding-left: 20px;
        }
    }

    &__employees {
        grid-area: 1 / 3 / 2 / 4;
        display: flex;
        align-items: center;

        @include tablet {
            grid-area: 4 / 1 / 5 / 3;
        }

        @include mobile {
            grid-area: 4 / 1 / 5 / 3;
            padding: 0 10px;
        }
    }

    &__adress {
        grid-area: 2 / 2 / 3 / 4;

        @include tablet {
            grid-area: 3 / 1 / 4 / 3;
        }

        @include mobile {
            grid-area: 3 / 1 / 4 / 3;
            padding: 0 20px;
        }
    }

    &__content {
        grid-area: 2 / 2 / 3 / 4;
        margin: -8px 0 0;

        @include mobile {
            grid-area: 4 / 1 / 5 / 4;
            margin: 0;
        }
    }

    &__photos {
        grid-area: 4 / 2 / 5 / 4;
        display: flex;
        overflow-x: scroll;

        @include tablet {
            grid-area: 5 / 1 / 6 / 3;
        }

        @include mobile {
            grid-area: 5 / 1 / 6 / 3;
        }

        &::-webkit-scrollbar {
          display: none;
        }
    }

    &__photo {
        width: 200px;
        height: 120px;
        border-radius: 16px;
        min-width: 200px;

        &:not(:last-child) {
            margin: 0 20px 0 0;

            @include tablet {
                margin: 0 10px 0 0;
            }
        }

        @include mobile {
          margin: 0 0 0 17px !important;
        }
    }

    &__description {
        grid-area: 3 / 2 / 4 / 4;
        margin: 0 98px 0 0;

        @include tablet {
            // margin:
            grid-area: 2 / 1 / 3 / 3;
        }

        @include mobile {
            grid-area: 2 / 1 / 3 / 3;
            margin: 0;
        }
    }

    &__hr-long {
        grid-area: 5 / 2 / 6 / 4;
        margin: 0 0 5px;

        @include tablet {
            grid-area: 6 / 1 / 7 / 3;
            margin: 0 0 15px;
        }

        @include mobile {
            grid-area: 6 / 1 / 7 / 3;
            padding: 0 20px;
        }
    }

    &__vacancies {
        grid-area: 6 / 2 / 7 / 4;
        margin: 0 0 0 32px;

        @include tablet {
            grid-area: 7 / 1 / 8 / 3;
            margin: 50px -30px 0 0;
        }

        @include mobile {
            grid-area: 7 / 1 / 8 / 3;
            margin: 50px 0 0 0;
        }
    }
}
</style>
