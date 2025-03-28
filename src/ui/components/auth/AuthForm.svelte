<script lang="ts">
  import LoadingButton from "./LoadingButton.svelte";

  interface LoginData {
    email: string;
    password: string;
  }

  interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  interface Props {
    mode: "login" | "register";
    loginData: LoginData;
    registerData: RegisterData;
    isLoading: boolean;
    onLogin: () => void;
    onRegister: () => void;
    onLoginDataChange: (field: keyof LoginData, value: string) => void;
    onRegisterDataChange: (field: keyof RegisterData, value: string) => void;
  }

  let {
    mode,
    loginData,
    registerData,
    isLoading,
    onLogin,
    onRegister,
    onLoginDataChange,
    onRegisterDataChange,
  }: Props = $props();
</script>

{#if mode === "login"}
  <form
    onsubmit={(e) => {
      e.preventDefault();
      onLogin();
    }}
  >
    <div class="form-control mb-4">
      <label class="label" for="login-email">
        <span class="label-text">Email</span>
      </label>
      <input
        id="login-email"
        type="email"
        placeholder="Enter your email"
        class="input input-bordered w-full"
        value={loginData.email}
        oninput={(e) =>
          onLoginDataChange("email", (e.target as HTMLInputElement).value)}
        required
      />
    </div>

    <div class="form-control mb-6">
      <label class="label" for="login-password">
        <span class="label-text">Password</span>
      </label>
      <input
        id="login-password"
        type="password"
        placeholder="Enter your password"
        class="input input-bordered w-full"
        value={loginData.password}
        oninput={(e) =>
          onLoginDataChange("password", (e.target as HTMLInputElement).value)}
        required
      />
    </div>

    <LoadingButton type="submit" variant="primary" {isLoading}>
      {#snippet children()}
        {#if isLoading}
          Signing in...
        {:else}
          Sign In
        {/if}
      {/snippet}
    </LoadingButton>
  </form>
{:else}
  <form
    onsubmit={(e) => {
      e.preventDefault();
      onRegister();
    }}
  >
    <div class="form-control mb-4">
      <label class="label" for="register-name">
        <span class="label-text">Name</span>
      </label>
      <input
        id="register-name"
        type="text"
        placeholder="Enter your name"
        class="input input-bordered w-full"
        value={registerData.name}
        oninput={(e) =>
          onRegisterDataChange("name", (e.target as HTMLInputElement).value)}
        required
      />
    </div>

    <div class="form-control mb-4">
      <label class="label" for="register-email">
        <span class="label-text">Email</span>
      </label>
      <input
        id="register-email"
        type="email"
        placeholder="Enter your email"
        class="input input-bordered w-full"
        value={registerData.email}
        oninput={(e) =>
          onRegisterDataChange("email", (e.target as HTMLInputElement).value)}
        required
      />
    </div>

    <div class="form-control mb-4">
      <label class="label" for="register-password">
        <span class="label-text">Password</span>
      </label>
      <input
        id="register-password"
        type="password"
        placeholder="Enter your password"
        class="input input-bordered w-full"
        value={registerData.password}
        oninput={(e) =>
          onRegisterDataChange(
            "password",
            (e.target as HTMLInputElement).value,
          )}
        required
      />
    </div>

    <div class="form-control mb-6">
      <label class="label" for="register-confirm-password">
        <span class="label-text">Confirm Password</span>
      </label>
      <input
        id="register-confirm-password"
        type="password"
        placeholder="Confirm your password"
        class="input input-bordered w-full"
        value={registerData.confirmPassword}
        oninput={(e) =>
          onRegisterDataChange(
            "confirmPassword",
            (e.target as HTMLInputElement).value,
          )}
        required
      />
    </div>

    <LoadingButton type="submit" variant="primary" {isLoading}>
      {#snippet children()}
        {#if isLoading}
          Registering...
        {:else}
          Register
        {/if}
      {/snippet}
    </LoadingButton>
  </form>
{/if}
