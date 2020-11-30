<template>
	<g
		:transform="`translate(${state.grid.x * cellSize}, ${
			(state.grid.y - 1) * cellSize
		})`"
		v-bind:class="{
			disabled:
				userTotal + state.population > totalCases &&
				!selectedStates.includes(state.name),
			selected: selectedStates.includes(state.name),
		}"
	>
		<rect :width="cellSize - 2" :height="cellSize - 2"></rect>
		<text :x="cellSize / 2" :y="cellSize / 3.5" dy=".55em">
			{{ state.id }}
		</text>
		<text class="population" :x="cellSize / 2" :y="(cellSize / 4) * 3">
			{{ thousandsFormat(state.population) }}
		</text>
	</g>
</template>

<script>
import * as d3 from "d3";

export default {
	name: "Map",
	props: {
		state: Object,
		selectedStates: Array,
		cellSize: Number,
		userTotal: Number,
		totalCases: Number,
	},
	methods: {
		millionsFormat: d3.format(".3s"),
		thousandsFormat: d3.format(".1s"),
	},
	mounted() {},
};
</script>

<style lang="scss">
.disabled {
	rect {
		fill: white;
	}

	text {
		fill: grey;
	}
}

.selected {
	rect {
		fill: #f66c5e !important;
	}

	text {
		fill: white;
		font-weight: 600;
	}
}

rect {
	fill: #eeeeee;
}
</style>
