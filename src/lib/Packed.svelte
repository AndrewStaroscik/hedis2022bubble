<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let packedData;

  let data = {
    name: 'root', 
    children: packedData
  }  

  const width = 800;
  const height = 800;
  
  const packLayout = d3.pack()
	.size([width, height]);

  let rootNode = d3.hierarchy(data)

  // this is scaling the circles, don't need it?
  rootNode.sum(function(d) {
	  return 100;
  });
  const chart = () => {
    const svg = d3.select('#vis')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    packLayout(rootNode); 

    let nodes = svg.selectAll('g')
      .data(rootNode.descendants())
      .join('g')
      .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})

    nodes
      .append('circle')
      .classed('circle', true)
      .attr('r', function(d) { return d.r; })
      .style('fill', '#6666ff')
      .style('fill-opacity', 0.2)
      .style('stroke', '#6666ff')

      

    nodes
      .append('text')
      .attr('dy', 4)
      .text(function(d) {
        return d.children === undefined ? d.data.name : '';
    })
  }

  onMount(() => {
    chart();
  })

</script>


<div id="vis">packed:</div>

<style>
  .circle {
    fill: indianred;
    opacity: 0.3;
    stroke: white;
  }
  text {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    fill: white;
    font-size: 10px;
    text-anchor: middle;
  }

</style>