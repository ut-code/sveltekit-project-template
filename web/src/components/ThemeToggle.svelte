<script lang="ts">
  import Icon from "@iconify/svelte";
  import { PersistedState } from "runed";
  const theme = new PersistedState<(typeof themes)[number]>(
    "theme-preference",
    "",
  );

  const themes = ["", "light", "dark"] as const;
  const labels = {
    "": "Auto",
    light: "Light",
    dark: "Dark",
  };
  const icons = {
    "": "fe:laptop",
    light: "fe:sunny-o",
    dark: "fe:moon",
  };
  $inspect(theme.current);
</script>

<div class="dropdown mr-20 w-32">
  <button
    class="btn w-full text-left text-sm"
    popovertarget="theme-toggle-dropdown"
    popovertargetaction="toggle"
  >
    <Icon icon={icons[theme.current]} />
    {labels[theme.current]}
  </button>

  <ul class="dropdown-content w-40">
    {#each themes as t}
      <li>
        <input
          type="radio"
          name="theme"
          class="theme-controller btn btn-block btn-sm justify-start"
          aria-label={labels[t]}
          value={t}
          bind:group={theme.current}
        />
      </li>
    {/each}
  </ul>
</div>
