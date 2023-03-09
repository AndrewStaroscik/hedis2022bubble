<script>
  export let sLab;
  export let sLastClicked;

  const sClickListener = () => {
    sLastClicked = sLab; 
  }
  
</script>
  
<button id="{sLab}"class="sbutton {sLab == sLastClicked ? 'selsector' : ''}" on:click={sClickListener}>
  {sLab}
</button>


<style>
  .sbutton {
    width: 140px;
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
    border: 2px solid #87c3e6;
    font-size: 16px;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .selsector {
    border: 2px solid rgb(0, 8, 100);
    color: rgb(0, 8, 100);
    font-size: 16px;
    font-weight: bold; 
  }

  .sbutton:hover {
    box-shadow: rgba(0, 85, 117,.35) 0 -25px 18px -14px inset,rgba(0, 85, 117,.25) 0 1px 2px,rgba(0, 85, 117,.25) 0 2px 4px,rgba(0, 85, 117,.25) 0 4px 8px,rgba(0, 85, 117,.25) 0 8px 16px,rgba(0, 85, 117,.25) 0 16px 32px;
    transform: scale(1.075);
  }

  </style>
