<script lang="ts">
  interface Props {
    activeTab: "login" | "register";
    onTabChange: (tab: "login" | "register") => void;
  }

  let { activeTab, onTabChange }: Props = $props();
</script>

<div class="tabs tabs-boxed mb-6">
  <button
    class="tab {activeTab === 'login' ? 'tab-active' : ''}"
    onclick={() => onTabChange("login")}
  >
    Login
  </button>
  <button
    class="tab {activeTab === 'register' ? 'tab-active' : ''}"
    onclick={() => onTabChange("register")}
  >
    Register
  </button>
</div>
