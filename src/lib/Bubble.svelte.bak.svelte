<script>
  import * as d3 from 'd3';
  import {onMount} from 'svelte';

  export let labeledData;

  console.log(labeledData);

  let data = {
    nodes: labeledData, 
    links: [
      {source: 'PPC-p', target: 'PPC-t'},
      {source: 'PCE-sc', target: 'PCE-b'},
      {source: 'CDC-bp', target: 'CDC-hb'},
      {source: 'CDC-bp', target: 'CDC-e'},
      {source: 'SPD-r', target: 'SPD-a'},
      {source: 'SPC-r', target: 'SPC-a'},
      {source: 'TRC-n', target: 'TRC-d'},
      {source: 'TRC-e', target: 'TRC-d'},
      {source: 'TRC-e', target: 'TRC-m'},
    ]
  };

  const width = 700;
  const height = 700;
  const centerP = {x:width * .6, y:height * .5};
  const centerO = {x:width * .2, y:height * .3};
  const centerE = {x:width * .2, y:height * .7};

  // give these scope outside the chart() function
  let svg = null;
  let measure = null;
  let link = null;

  const colorScale = ['orange', 'lightblue', '#B19CD9'];

  const colorLabels = [
    {label: 'Experience', x: 60, y: 60},
    {label: 'Process', x: 60, y: 60},
    {label: 'Outcome', x: 60, y: 60}
  ];

  const colorOptions = {
    'experience':'orange',
    'process': 'lightblue',
    'outcome': '#b19cd9'
  };

  const strokeColorK = 3;
  
  const linkArc = d =>`M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`

  // the way to move the g elements
  //.attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})
  const ticked = () => {
      // d3.select('svg').selectAll('.link')
      //     .attr("x1", function(d) { return d.source.x; })
      //     .attr("y1", function(d) { return d.source.y; })
      //     .attr("x2", function(d) { return d.target.x; })
      //     .attr("y2", function(d) { return d.target.y; });

    d3.select('svg')
      .selectAll('.measure')
      .data(data.nodes)
      .join('g')
      .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'});

    };

let sim = d3.forceSimulation(data.nodes)
  //.force("link", d3.forceLink(data.links).id(d => d.id))
  .force('y', d3.forceY(d => {
    if (d.weight == '1.0') {
      return centerP.y;
    } else if (d.weight == '1.5') {
      return centerE.y;
    } else { // weight == '3.0'
      return centerO.y;
    }
  }).strength(0.06))
  .force('x', d3.forceX(d => {
    if (d.weight == '1.0') {
      return centerP.x;
    } else if (d.weight == '1.5') {
      return centerE.x;
    } else { // weight == '3.0'
      return centerO.x;
    }
  }).strength(0.06))
  .force('collision', d3.forceCollide().radius(d => 30 + 1))
    .on('tick', ticked);


  // chart needs to be in a function that is called
  // using sveltes onMount
  const chart = () => {




    const mouseover = (event, d) => {
      console.log('over');
    }

  const mousemove = (event, d) => {
    //console.log(event)
  }

  const mouseleave = () => {
    console.log('out');
  }

  svg = d3.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  

  measure = svg.selectAll('.measure')
    .data(data.nodes)

  let measureE = measure.enter().append('g')
      .classed('measure', true)
      .attr("data-plan", d => d.plan)
      .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
      
      measureE.append('circle')
    .classed('circle', true)
    .attr('r', function(d) { return 30; })
    .style('fill', d => {
      if (d.weight == '1.0') {
        return colorOptions['process'];
      } else if (d.weight == '1.5') {
        return colorOptions['experience'];
      } else { // weight == '3.0'
        return colorOptions['outcome'];
      }
    })
    .style('fill-opacity', 0.9)
    .style('stroke', d => d3.color(colorOptions[d.meas]).darker(strokeColorK))
    
    measureE.append('text')
    .classed('measuretxt', true)
    .attr('pointer-events', 'none')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('fill', d => d3.color(colorOptions[d.meas]).darker(strokeColorK))
    .style('font-size', '16px')
    .text(d => d.id);


    // link = svg.append("g")
    //   .attr("class", "link")
    //   .selectAll("line")
    //   .data(data.links)
    //   .enter().append("line")
    //   .attr("x1", function(d) { return d.source.x; })
    //   .attr("y1", function(d) { return d.source.y; })
    //   .attr("x2", function(d) { return d.target.x; })
    //   .attr("y2", function(d) { return d.target.y; })
    //   .attr("stroke-width", 2); //function(d) { return Math.sqrt(d.value); });




















  }

  onMount(() => {
    chart();
    sim.alpha(1)
    .alphaTarget(0.1)
    .restart();
  })

</script>

<div id="vis">vis</div>