<script>
  import * as d3 from 'd3';
  import {onMount} from 'svelte';
  import { attr, svg_element } from 'svelte/internal';

  export let labeledData;
  export let aLastClicked;
  export let sLastClicked;
  export let infoTxt;
  export let legendSelect;

  $: aLastClicked, aUpdate();
  $: sLastClicked, aUpdate();
  $: legendSelect, aUpdate();

  //console.log(labeledData);
  const width = 625;
  const height = 700;
  const centerP = {x:width * .55, y:height * .4};
  const centerO = {x:width * .25, y:height * .25};
  const centerE = {x:width * .25, y:height * .55};

  let svg = null;
  let legend = null;

  let updateTxt = (val) => {
    let obj = null
    for (let m of data.nodes) {
      if (m.id == val) {
        obj = m;   
      }
    }
    let sectorArr = []
    if (obj.commercial == 1) sectorArr.push('Commercial');
    if (obj.medicare == 1) sectorArr.push('Medicare');
    if (obj.medicaid == 1) sectorArr.push('Medicaid');

    let sectString = '';
    for (let i = 0; i < sectorArr.length; i += 1) {
      sectString += `${sectorArr[i]}`
      if (i < sectorArr.length -1) sectString += ', '
    }

    let txtStr = `<div class='report_title'<strong>${obj.id}</strong></div>`;
    txtStr += `<div class='report' style='text-align: center;'>${obj.display}</div>`
    if (obj.type == 'PATIENT EXPERIENCE') {
      txtStr += `<p class='report' style='text-align:left;'>Patient experience metrics are calculated using data collected from various sources, including member surveys and administrative records. Information is drawn from the Consumer Assessment of Healthcare Providers and Systems (CAHPS) survey, the Health Outcomes Survey (HOS), and complaint and appeal rates. HEDIS does not provide three-letter codes for these metrics. The codes shown here were developed for the visualization.</p>`    
    } else {
      txtStr += `<p class='report' style='text-align: left;'>${obj.desc}</p>`
    }
    txtStr += `<p class='report' style='text-align: left;'><u>Area</u>: ${obj.area}</p>`
    txtStr += `<p class='report' style='text-align: left;'><u>Sectors</u>: <em>${sectString}</em></p>`
    if (obj.id == 'FUI') {
      // console.log("fui");
    } else if (obj.type == 'PATIENT EXPERIENCE') {
      // console.log('exp');
    } else {
      txtStr += `<p class='hlnk' style='text-align: center;'><a class='hlnk' href='${obj.link}' target='_blank' rel='noopener noreferrer'>More Information</a></p>`
    }
    

    infoTxt = txtStr
    
  }

  let data = {
    nodes: labeledData, 
    links: [
      {source: 'PPC-p', target: 'PPC-t', type: 'related'},
      {source: 'PCE-sc', target: 'PCE-b', type: 'related'},
      {source: 'CDC-bp', target: 'CDC-hb', type: 'related'},
      {source: 'CDC-bp', target: 'CDC-e', type: 'related'},
      {source: 'SPD-r', target: 'SPD-a', type: 'related'},
      {source: 'SPC-r', target: 'SPC-a', type: 'related'},
      {source: 'TRC-n', target: 'TRC-d', type: 'related'},
      {source: 'TRC-d', target: 'TRC-e', type: 'related'},
      {source: 'TRC-e', target: 'TRC-m', type: 'related'},
      {source: 'DDE', target: 'DAE', type: 'related'}

    ]
  };

  const links = data.links.map(d => Object.create(d));
  const nodes = data.nodes.map(d => Object.create(d));
  const linkArc = d =>`M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`

  const color = '#006688';
  const radius = 27;
  const forceCollideRadius = radius + 3;

  const colorScale = ['#ff9973', '#d2cef5', '#c4f378'];

  const altColors = ['#ff9973', '#aadfef', '#fff2b3'];

  const colorLabels = [
    {label: 'Experience', x: 60, y: 60},
    {label: 'Process', x: 60, y: 60},
    {label: 'Outcome', x: 60, y: 60}
  ];

  const altLabels = [
    {label: 'Experience', x: 60, y: 60},
    {label: 'Prevention', x: 60, y: 60},
    {label: 'Treatment', x: 60, y: 60}
  ];

  const colorOptions = {
    'experience':'#ff9973',
    'process': '#d2cef5',
    'outcome': '#c4f378'
  };

  const altOptions = {
    'experience':'#ff9973',
    'prevention': '#aadfef', 
    'treatment':'#fff2b3' 
  }

  const strokeColorK = 3;

  const drag = simulation => {
  
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.2).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
        .on('end', dragended);
  }

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody().strength(1))
    .force('x', d3.forceX( d => {
      if (d.weight == '1.0') {
      return centerP.x;
    } else if (d.weight == '1.5') {
      return centerE.x;
    } else { // weight == '3.0'
      return centerO.x;
    }
    }))
    .force('y', d3.forceY( d => {
      if (d.weight == '1.0') {
      return centerP.y;
    } else if (d.weight == '1.5') {
      return centerE.y;
    } else { // weight == '3.0'
      return centerO.y;
    }
    }))
    .force('collide', d3.forceCollide(d => forceCollideRadius));

  const chart = () => {
    svg = d3.select('#vis')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.append('rect')
      .attr('x', 2.5)
      .attr('y', 2.5)
      .attr('width', width-5)
      .attr('height', height-5)
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('rx', 10)
      .attr('stroke', '#87c3e6')
      .attr('opacity', 0.3);

    const types = Array.from(new Set(links.map(d => d.type)))

    // Per-type markers, as they don't inherit styles.
    svg.append('defs').selectAll('marker')
      .data(types)
      .join('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 38)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', color)
      .attr('d', 'M0,-5L10,0L0,5');

      const link = svg.append('g')
        .classed('lnk', true)
        .attr('fill', 'none')
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 0.2)
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('stroke', d => '#000')


    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));
   
      node.append('circle')
      .attr('r', radius)
      .attr('fill', 'white')
      .attr('stroke-width', 0.5)
      .attr('stroke', 'none');  

    
    node.append('circle')
      .classed('measure_el', true)
      .attr('stroke-width', 1.5)
      .attr('r', radius)
      .attr('fill', d => {
        if (legendSelect == 0) {
          if (d.weight == '1.0') {
            return colorOptions['process'];
          } else if (d.weight == '1.5') {
            return colorOptions['experience'];
          } else { // weight == '3.0'
            return colorOptions['outcome'];
          }
        } else { // legendSelect is 1
          if (d.type == 'PATIENT EXPERIENCE') {
            return altOptions['experience']
          } else if (d.type == 'PREVENTION') {
            return altOptions['prevention'];
          } else { // TREATMENT
            return altOptions['treatment'];
          }

        }
      })
      .attr('stroke-width', 0.5)
      .attr('stroke', d => 'black');
  
    node.append('text')
      .classed('measuretxt', true)
      .attr('pointer-events', 'none')
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle')
      .style('fill', d => 'black')//d3.color(colorOptions[d.meas]).darker(strokeColorK))
      .style('font-size', '13px')
      .text(d => d.id);
  
    node.on('click', (e, d) => {
      updateTxt(nodes[d.index].id);
    })


    simulation.on('tick', () => {
      link.attr('d', linkArc);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    legend = svg.append('g')
    .attr('class', 'vislegend')
    .attr('transform', 'translate(190,590)');

    for (let i = 0; i < colorScale.length; i +=1) {
      legend.append('rect')
        .attr('x', 0)  
        .attr('y', 33 * i)  
        .attr('height', 25)  
        .attr('width', 25)
        .attr('ry', 9)
        .style('fill', () =>{ 
          if (legendSelect == 0) {
            return colorScale[i];
          } else {
            return altColors[i];
          }
        })
        .style('stroke', d => d3.color(colorScale[i]).darker(strokeColorK))
        .style('stroke-width', 1.5);  

      legend.append('text')
        .attr('x', 30)
        .attr('y',16 + (33*i))
        .attr('alignment-baseline', 'middle')
        .text(colorLabels[i].label)
    }
  

  } // end chart

  


 

    let aUpdate = () => {
      if (svg !== null) {
        let sTest = sLastClicked.toLowerCase();
        svg.selectAll('.measure_el')
          .attr('fill', d => {
            if (legendSelect == 0) {
              if (d.weight == '1.0') {
                return colorOptions['process'];
              } else if (d.weight == '1.5') {
                return colorOptions['experience'];
              } else { // weight == '3.0'
                return colorOptions['outcome'];
              }
            } else { // legendSelect is 1
              if (d.type == 'PATIENT EXPERIENCE') {
                return altOptions['experience']
              } else if (d.type == 'PREVENTION') {
                return altOptions['prevention'];
              } else { // TREATMENT
                return altOptions['treatment'];
              }

            }
          })
          .attr('opacity', d => {
            if (aLastClicked == 'All') {
              if (sLastClicked == 'All') {
                return 1;
              } else {
                if (d[sTest] == 1) {
                  return 1;
                } else {
                  return 0.3;
                }
              }
            } else {
              if (sLastClicked == 'All' && d.aGrp == aLastClicked) {
                return 1;
              } else if (d[sTest] == 1 && d.aGrp == aLastClicked) {
                return 1;
              } else {
                return 0.3;
              }
            }
          }) 

          svg.selectAll('.measuretxt')
          .attr('opacity', d => {
            if (aLastClicked == 'All') {
              if (sLastClicked == 'All') {
                return 1;
              } else {
                if (d[sTest] == 1) {
                  return 1;
                } else {
                  return 0.2;
                }
              }
            } else {
              if (sLastClicked == 'All' && d.aGrp == aLastClicked) {
                return 1;
              } else if (d[sTest] == 1 && d.aGrp == aLastClicked) {
                return 1;
              } else {
                return 0.2;
              }
            }
          })

          d3.select(".vislegend").selectAll("*").remove();
          for (let i = 0; i < colorScale.length; i +=1) {
            legend.append('rect')
              .attr('x', 0)  
              .attr('y', 33 * i)  
              .attr('height', 25)  
              .attr('width', 25)
              .attr('ry', 9)
              .style('fill', () =>{ 
                if (legendSelect == 0) {
                  return colorScale[i];
                } else {
                  return altColors[i];
                }
              })
              .style('stroke', d => d3.color(colorScale[i]).darker(strokeColorK))
              .style('stroke-width', 1.5);  

            legend.append('text')
              .attr('x', 30)
              .attr('y',16 + (33*i))
              .attr('alignment-baseline', 'middle')
              .text(() => {
                if (legendSelect == 0) {
                  return colorLabels[i].label;
                } else {
                  return altLabels[i].label;
                }
              })
            } 
      } // end svg if
    }

    
    onMount(() => {
      chart();
    })

</script>

<div id='vis'></div>