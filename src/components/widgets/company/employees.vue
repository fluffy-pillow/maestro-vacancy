<template>
	<div class="company__employees">
		<img src='@/assets/img/employees.svg'>
		<span>{{count | format}} сотрудников</span>
	</div>
</template>

<script>
	export default {
		props: {
			count: {
				type: Number,
				default: 0
			},
		},
		filters: {
			format(value) {
				return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
			},
		},
	}
</script>

<style lang="scss" scoped>
.company {
	&__employees {
		display: flex;
		align-items: center;
		background: #F8FAFD;
		border-radius: 16px;
		padding: 20px 35px;
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 22px;
		color: #353535;
    margin: 30px 0;

		@include tablet {
			background: transparent;
			padding: 0;
      margin: 0;
		}

		@include mobile {
			background: transparent;
			padding: 0;
      margin: 0;
		}

		img {
			height: 23px;
			margin: 0 15px 0 0;

			@include tablet {
				margin: 0 18px 0 0;
			}

			@include mobile {
				margin: 0 15px 0 0;
			}
		}
	}
}
</style>
