<svelte:head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;700&display=swap');
  </style>
</svelte:head>

<slot></slot>

<style>
  :global(:root){
    --text-color: "#737373";
    --main-font: "Archivo Narrow";
  }

  :global(.bold) {
    fill: var(--text-color);
    font-family: var(--main-font);
    font-weight: bold;
  }

  :global(.normal) {
    fill: var(--text-color);
    font-family: var(--main-font);
    font-weight: normal;
  }
</style>