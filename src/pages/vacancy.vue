<template>
<div id="vacancy">
	<vacancy :vacancy='vacancy' :company='company' :other='other'/>
	<footer-section/>
</div>
</template>

<script>
import vacancy from '@/components/vacancy/vacancy.vue'
import footer from '@/components/global/footer.vue'

export default {
	layout: 'default',
    components: {
		vacancy,
		'footer-section': footer,
    },
    data() {
        return {
            vacancy: {
				title: 'Официант',
				salary: {
					min: 20000,
					max: null,
					fix: null
				},
				image: 'waiter',
				content: [
					{
						title: 'Обязанности:',
						content: 'Подготовка зала ресторана к открытию;<br>Уборка и подготовка рабочего места;<br>Сервировки столов в соответствии со стандартами ресторана;<br>Изучение меню, знание основных блюд и напитков, предлагаемых гостям;<br>Приём заказов;<br>Подача блюд и напитков согласно установленным правилам обслуживания;<br>Создание уютной атмосферы для гостей.'
					},
					{
						title: 'Требования:',
						content: 'Клиентоориентированность, вежливость, стрессоустойчивость, честность, серьезный настрой в работе.<br>Опыт работы в кафе/ресторане приветствуется.'
					},
					{
						title: 'Условия:',
						content: 'Официальное трудоустройство согласно ТК РФ (Надежность и стабильность – наши ведущие принципы в работе);<br>Сменный график 3/3 с 10-30 до 23-30 или 5/2 с 07-00 до 16-00;<br>Транспорт для сотрудников (в ночное время);<br>Стабильная высокая окладная часть: 22 500+% от продаж;<br>Бесплатное питание;<br>50% компенсация на оформление медицинской книжки;<br>Стабильная з/п 2 раза в месяц, есть возможность подработки на банкетах;<br>Иногородним предоставляем жильё;<br>Есть возможность карьерного роста до старшего официанта.'
					}
				]
			},
			other: [
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
            company: {
				name: 'McDonald’s',
				logo: 'mcdonalds',
				contacts: {
					url: 'https://mcdonalds.ru',
					adress: 'г. Москва, ул. Красноармейская, 3а',
				},
				info: {
					about: 'McDonald’s, «Макдо́налдс» — американская корпорация, работающая в сфере общественного питания, до 2010 года крупнейшая в мире сеть ресторанов быстрого питания, работающая по системе франчайзинга',
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
			}
        }
    },
}
</script>

<style>
</style>
