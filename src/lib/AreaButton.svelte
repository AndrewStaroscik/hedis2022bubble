<script>
  export let aLab;
  export let aLastClicked;
  export let areasObj;

  const clickListener = () => {
    aLastClicked = aLab; 
  }

   

  // need to filter by segment
  // treatment/prevention 

</script>
<div class="abutton_wrapper">  
  <button id="{aLab}"class="abutton {aLab == aLastClicked ? 'selarea' : ''}" on:click={clickListener}>
    {aLab}
  </button>
</div>

<style>

  .abutton_wrapper {
    margin: 15px 0;
  }

  .abutton {
    width: 160px;
    margin: 0 8px;
    background-color: #c3ebfa;
    border-radius: 10px;
    box-shadow: rgba(0, 85, 117, .2) 0 3px 4px ,rgba(0, 85, 117, .2) 0 4px 5px,rgba(0, 85, 117, .2) 0 5px 6px;
    color: rgb(41, 92, 122);
    cursor: pointer;
    font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
    padding: 7px 5px;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 2px solid rgb(135, 195, 230);
    font-size: 16px;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    opacity: 0.8;
  }

  .selarea {
    border: 2px solid rgb(0, 8, 100);
    color: rgb(0, 8, 100);
    font-size: 16px;
    font-weight: bold; 
    opacity: 1;
  }

  .abutton:hover {
    box-shadow: rgba(0, 85, 117,.35) 0 -25px 18px -14px inset,rgba(0, 85, 117,.25) 0 1px 2px,rgba(0, 85, 117,.25) 0 2px 4px,rgba(0, 85, 117,.25) 0 4px 8px,rgba(0, 85, 117,.25) 0 8px 16px,rgba(0, 85, 117,.25) 0 16px 32px;
    transform: scale(1.075);  
  }

</style>
