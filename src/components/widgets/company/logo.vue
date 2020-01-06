<template>
	<div class="company__logo">
		<img :src='require("@/assets/img/company/logo/"+company+".jpg")' :srcset='require("@/assets/img/company/logo/"+company+"@2x.jpg")'>
	</div>
</template>

<script>
	export default {
		props: {
			company: {
				type: String,
				default: 'mcdonalds'
			},
		},
	}
</script>

<style lang="scss" scoped>
.company {
	&__logo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 0 40px;

		@include tablet {
			width: 98px;
			height: 98px;
			margin: 0;
		}

		@include mobile {
			width: 62px;
			height: 62px;
			margin: 0;
		}

		img {
			height: 100%;
		}
	}
}
</style>
