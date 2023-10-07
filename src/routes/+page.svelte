<script>
  import Pdf from "../components/Pdf.svelte";
  import Cover from "../components/Cover.svelte";

  import { onMount } from 'svelte';
  import { csv, autoType } from "d3";
  import { adjustKeys } from "../stores/processHelpers";

  const defaultPath = "https://docs.google.com/spreadsheets/d/1zKDz9cCOF-Hi8pbxt_0Eqy7lGFOzFTt0I4vUplHh61k/export?format=csv"

  let sheetsData;
  let data;
  let dataIndex = 0;
  let rerender = true;

  let ready = false;
  onMount(async () => {
    sheetsData = (await csv(defaultPath, autoType)).map(d => $adjustKeys(d));
    data = sheetsData[dataIndex];
    ready = true;
  })

  function changeSelectedRow(e) {
    const i = +e.target.value;
    dataIndex = i;
    data = sheetsData[dataIndex];
    rerender = !rerender;
  }

  let canvasElements = [];
  let svgElements = [];

  const pages = ["a"];
</script>

{#if ready}
  <div class="app-container">
    {#key rerender}
      <div class="pages-container">
        {#each pages as p, i (p)}
          <Cover {data} bind:canvasElement={canvasElements[i]} bind:svgElement={svgElements[i]}/>
        {/each}
      </div>
    {/key}
    <div class="gui-container">
      {#if sheetsData}
        <div>
          <select id="lang-selector" on:change={changeSelectedRow}>
            {#each sheetsData as row, i}
              <option value={i} selected={i === 0}>{row.titulo}</option>
            {/each}
          </select>
        </div>
      {/if}
      {#key rerender}
        {#if ready}
          <Pdf {canvasElements} {svgElements}/>
        {/if}
      {/key}
    </div>
  </div>
{/if}

<style>
  .app-container {
    display: flex;
    margin: auto;
    align-items: flex-start;
    justify-content: center;
    gap: 1em;
  }

  .pages-container {
    border: solid 1px black;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 1em;
    gap: 1em;
    overflow: scroll;
    max-height: 800px;
    border-radius: 5px;
  }

  .gui-container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    border: solid 1px;
    border-radius: 5px;
  }
</style>