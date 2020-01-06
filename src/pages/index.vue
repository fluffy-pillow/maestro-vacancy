<template>
	<div class="pages">
		<h3>Страницы</h3>
		<ul>
			<li>
				<router-link to="vacancy">Вакансия</router-link>
			</li>
			<li>
				<router-link to="company">Компания</router-link>
			</li>
			<li>
				<router-link to="test">Тестирование</router-link>
			</li>
			  <li>
				<router-link to="video">Видео</router-link>
			  </li>
		</ul>
	</div>
</template>

<script>
	export default {
		layout: 'default',
	}
</script>

<style lang="scss" scoped>
.pages {
	width: 50vw;
	margin: 200px auto 200px;
}
</style>
