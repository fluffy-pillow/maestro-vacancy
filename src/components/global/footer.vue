<template lang='pug'>
.footer
	p.footer__text Данная вакансия размещена через систему
	.footer__logo
		img(src='@/assets/img/logo.svg')
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.footer {
	padding: 28px 0 42px;
	background: #F8FAFD;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	&__text {
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 22px;
		color: #000000;
		margin: 0 0 21px;
	}
	&__logo {
		img {
			display: block;
		}
	}
}
</style>