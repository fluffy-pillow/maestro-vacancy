<template>
	<div id="company">
		<company :company='company' :vacancies='vacancies'/>
		<footer-section/>
	</div>
</template>

<script>
import company from '@/components/company/company.vue'
import footer from '@/components/global/footer.vue'
	export default {
		layout: 'default',
		components: {
			company,
			'footer-section': footer,
		},
		data() {
			return {
				company: {
					name: 'McDonald’s',
					logo: 'mcdonalds',
					image: 'mcdonalds-bg',
					photos: [
						{img: 'gallery-image'},
						{img: 'gallery-image'},
						{img: 'gallery-image'}
					],
					contacts: {
						url: 'https://mcdonalds.ru',
						adress: 'г. Москва, ул. Красноармейская, 3а',
					},
					info: {
						about: 'McDonald’s, «Макдо́налдс» — американская корпорация, работающая в сфере общественного питания, до 2010 года крупнейшая в мире сеть ресторанов быстрого питания, работающая по системе франчайзинга',
						aboutBig: 'McDonald’s, «Макдо́налдс» — американская корпорация, работающая в сфере общественного питания, до 2010 года крупнейшая в мире сеть ресторанов быстрого питания, работающая по системе франчайзинга. На конец 2018 года под торговой маркой McDonald’s работало 37 855 ресторанов, из них 35 085 на правах франчайзинга.',
						employees: 185000
					},
					hr: {
						name: 'Гребневская Ульяна',
						position: 'Менеджер компании',
						photo: null,
						contacts: [
							{
								type: 'phone',
								value: '+7 (800) 707 44 99'
							},
							{
								type: 'email',
								value: 'info@ru.mcd.com'
							}
						]
					}
				},
				vacancies: [
					{
						logo: 'mcdonalds',
						title: 'Повар',
						salary: {
							min: 70000,
							max: 120000,
							fix: null
						}
					},
					{
						logo: 'mcdonalds',
						title: 'Официант-бармен',
						salary: {
							min: 20000,
							max: null,
							fix: null
						}
					},
					{
						logo: 'mcdonalds',
						title: 'Банкетный официант',
						salary: {
							min: null,
							max: 50000,
							fix: null
						}
					}
				],
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>