<template>
	<section>
		<div class="py-5 has-background-light">
			<div class="max-width-900">
				<p class="title is-spaced high-line-height">
					<span class="highlight-underline" @click="toggleusSelected()">{{
						this.usSelected ? "In the United States" : "Around the world"
					}}</span
					>, {{ this.millionsFormat(this.totalCases) }} people have had
					COVID-19.
				</p>
				<p class="subtitle mb-2">
					Just how many people is that? That's equivalent to the combined
					populations of:
				</p>
				<p
					class="is-inline-flex state-text-block"
					v-if="selectedStates.length == 0"
				>
					Select a state below
				</p>
				<span
					class="is-inline-flex state-text-block"
					v-for="(name, index) in selectedStates"
					:key="index"
				>
					<p>{{ name }}</p>
				</span>
			</div>
		</div>
		<p class="mt-3 heading">
			{{ this.millionsFormat(this.remainingCases) }} remaining
		</p>
		<div id="viz">
			<svg :width="this.width" :height="this.height">
				<g
					class="foreground"
					:transform="`translate(${margin / 2}, ${margin / 2})`"
				>
					<g
						v-for="(state, index) in states"
						class="state"
						:key="index"
						:transform="`translate(${state.grid.x * cellSize}, ${
							(state.grid.y - 1) * cellSize
						})`"
						@click="addToTotal(state)"
						v-bind:class="{
							disabled:
								userTotal + state.population > totalCases &&
								!selectedStates.includes(state.name),
							selected: selectedStates.includes(state.name),
						}"
					>
						<rect :width="cellSize - 2" :height="cellSize - 2"></rect>
						<text :x="cellSize / 2" :y="cellSize / 2" dy=".35em">
							{{ state.id }}
						</text>
						<text class="population" :x="cellSize - 4" :y="cellSize - 5">
							{{ thousandsFormat(state.population) }}
						</text>
					</g>
				</g>
			</svg>
		</div>
	</section>
</template>

<script>
import * as d3 from "d3";

export default {
	name: "Map",
	props: {
		states: Array,
		usCases: Number,
		globalCases: Number,
	},
	data() {
		return {
			margin: 4,
			mapWidth: 12,
			mapHeight: 8,
			cellSize: 55,
			userTotal: 0,
			selectedStates: [],
			alreadyOver: false,
			stateResponsibleForOver: null,
			usSelected: false,
		};
	},
	methods: {
		responsivefy(svg) {
			var container = d3.select(svg.node().parentNode),
				width = parseInt(svg.style("width")),
				height = parseInt(svg.style("height")),
				aspect = width / height;

			svg
				.attr("viewBox", "0 0 " + width + " " + height)
				.attr("perserveAspectRatio", "xMinYMid")
				.call(resize);

			d3.select(window).on("resize." + container.attr("id"), resize);

			function resize() {
				var targetWidth = parseInt(container.style("width"));
				svg.attr("width", targetWidth);
				svg.attr("height", Math.round(targetWidth / aspect));
			}
		},
		nozoom() {
			event.preventDefault();
		},
		addToTotal(d) {
			const name = d.name;
			const population = d.population;

			if (this.selectedStates.includes(name)) {
				this.userTotal -= population;
				this.selectedStates = this.selectedStates.filter(function (val) {
					return name != val;
				});
			} else {
				if (this.userTotal + population > this.totalCases) {
					console.log("This state would put over total!");
				} else {
					this.userTotal += population;
					this.selectedStates.push(name);
				}
			}
		},
		toggleusSelected() {
			this.usSelected = !this.usSelected;
			console.log("US Selected:", this.usSelected);
		},
		millionsFormat: d3.format(".3s"),
		thousandsFormat: d3.format(".1s"),
	},
	computed: {
		remainingCases: function () {
			return this.totalCases - this.userTotal;
		},
		width: function () {
			return this.mapWidth * this.cellSize + this.margin;
		},
		height: function () {
			return this.mapHeight * this.cellSize + this.margin;
		},
		totalCases: function () {
			return this.usSelected ? this.usCases : this.globalCases;
		},
	},
	mounted() {
		const { nozoom, responsivefy } = this;

		d3.select("#viz svg")
			.on("touchstart", nozoom)
			.on("touchmove", nozoom)
			.call(responsivefy);
	},
};
</script>

<style lang="scss">
.highlight-underline {
	border-bottom: 1px solid #f66c5e;
	border-bottom-style: solid;
	padding: 2px;
	cursor: pointer;
	transition: all 0.5s;

	&:hover {
		background: #f66c5e;
		border-radius: 3px;
		color: whitesmoke;
		transition: all 0.5s;
	}
}

.max-width-900 {
	max-width: 900px;
	margin: 0 auto;
}

.state-text-block {
	background: #f66c5e;
	padding: 1px 5px;
	margin: 2px;
	border-radius: 3px;
	color: white;
}

.high-line-height {
	line-height: 1.5 !important;
}

.foreground {
	cursor: pointer;
	pointer-events: all;
}

#viz {
	max-width: 750px;
	margin: 0 auto;
}

svg {
	max-height: 100%;
	padding: 15px;
}

.disabled {
	rect {
		fill: #eee;
	}

	text {
		fill: grey;
	}
}

.state {
	text {
		font-size: 12px;
		text-anchor: middle;
		stroke: none;
		pointer-events: none;
	}

	.population {
		font-size: 10px;
		text-anchor: end;
	}

	&:not(.disabled):hover {
		outline: 1px solid black;
	}

	&.disabled:hover {
		cursor: not-allowed;
	}
}

.selected {
	rect {
		fill: #f66c5e !important;
	}

	text {
		fill: white;
		font-weight: 600;
		// font-size: 14px;
	}
}

rect {
	fill: #dedede;
}
</style>
