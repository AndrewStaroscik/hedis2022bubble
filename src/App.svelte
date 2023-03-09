<script>
  import data from './lib/hedisData';
  import areasObj from './helpers/areas';
  import labeledArray from './helpers/labeledArray';
  import SegmentButton from './lib/SegmentButton.svelte';
  import AreaButton from './lib/AreaButton.svelte';
  import Bubble from './lib/Bubble.svelte';
  import Toggle from './lib/Toggle.svelte';
  import IntroText from './lib/IntroText.svelte';
  import MainText from './lib/MainTxt.svelte';
    import MainTxt from './lib/MainTxt.svelte';

  const segments = ['All','Commercial','Medicare','Medicaid'];
  let sLastClicked = 'All';
  let aLastClicked = 'All';
  const areaLabels = Object.keys(areasObj);
  let infoTxt = 'start';
  let legendSelect = 0;
 
  $: infoTxt, updateTxt();
  $: legendSelect, console.log(legendSelect);
  
  let updateTxt = () => {
    if(document.getElementById('report_area')) {
      document.getElementById('report_area').innerHTML = infoTxt;
    }
  }

  document.addEventListener('click', function(event) {
    let targ = event.target.className.baseVal;
      // do nothing
    if (targ == 'measure_el') {
      // do nothing 
    } else if (event.target.className == 'hlnk') {
      // do nothing
    } else if (event.target.classList.contains('report_area')) {
      // do nothing
    } else if (event.target.classList.contains('report')) {
      // do nothing
    } else {
      infoTxt = '';
    }
  })

  let labeledData = labeledArray(data);

</script>

<main>
  <IntroText />
  <div class="vis_container">
    <div class='toggle_wrapper'>
      <Toggle bind:legendSelect />
    </div>
    <!-- The main container for the whole vis -->
    <div class="l_wrapper">
      <div class="tlbuffer"></div>
      <div class="area_wrapper">
        Medical Areas:<br />
        <div class="areas_container">
          {#each areaLabels as a}
            <AreaButton aLab ={a} {areasObj} bind:aLastClicked/>
          {/each}
        </div>
      </div>  
    </div>   
      
    <div class="c_wrapper">
      <div class="segment_wrapper">
        Sectors:<br />
        <div class="segment_container">
          {#each segments as b}
            <SegmentButton sLab ={b} bind:sLastClicked/>
          {/each}
        </div>
      </div>
      <Bubble {labeledData} {sLastClicked} {aLastClicked} {legendSelect} bind:infoTxt/>
    </div>
  
   




    <div class="r_wrapper">
      <div class="report_area" id='report_area'></div>
    </div>

  </div>
  <MainTxt />
    


  
</main>

<style>

  .vis_container {
    width: 1150px;
    /* background-color: #efefef; */
    border-radius: 20px;
    position: relative;
  }
  .vis_wrapper,
  .top_region,
  .vis_container {
    display: flex;
  }

  .toggle_wrapper {
    position: absolute;
    left: 190px;
    bottom: 90px;
    z-index: 20;
  }

  .tlbuffer,
  .area_wrapper {
    /* border: 1px dashed goldenrod; */
    width: 180px;
  }

  .report_area {
    /* border: 2px solid #444; */
    overflow-y: scroll;
    /* background-color: ivory; */
    border-radius: 10px;
    width: 345px;
    height: 750px;
    padding: 15px;
  }
  
  .segment_wrapper {
    width: 625px;
    padding: 0 0 10px 0;
  }

  :global(.report_title) {
    display: inline-block;
    padding: 2px 10px;
    margin-bottom: 5px;
    border: 1px solid black;
    border-radius: 3px;
  }
  

</style>
