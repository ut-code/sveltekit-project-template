import { signIn, signUp } from "@/lib/auth/auth-client";

export type Mode = "login" | "register";
export class SigninController {
  mode: Mode = $state("register");
  processing = $state(false);

  feedback = $state<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  loginForm = $state({
    email: "",
    password: "",
  });
  registerForm = $state({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  switchMode() {
    this.mode = this.mode === "login" ? "register" : "login";
    this.feedback = null;
  }

  resetForm() {
    this.loginForm = {
      email: "",
      password: "",
    };
    this.registerForm = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  async handleLogin() {
    const form = this.loginForm;
    if (!form.email || !form.password) {
      this.feedback = {
        type: "error",
        message: "Please fill in all fields",
      };
      return;
    }

    try {
      const result = await signIn.email({
        email: this.loginForm.email,
        password: this.loginForm.password,
      });

      if (result.error) {
        this.feedback = {
          type: "error",
          message: result.error.message || "Login failed",
        };
      } else {
        this.feedback = {
          type: "success",
          message: "Login successful!",
        };
        this.resetForm();
        return result.data.user;
      }
    } catch (error) {
      this.feedback = {
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
      };
    } finally {
      this.processing = false;
    }
  }

  async handleRegister() {
    const form = this.registerForm;
    if (!form.name || !form.email || !form.password) {
      this.feedback = {
        type: "error",
        message: "Please fill in all fields",
      };
      return;
    }

    if (form.password !== form.confirmPassword) {
      this.feedback = {
        type: "error",
        message: "Passwords do not match",
      };
      return;
    }

    this.processing = true;
    this.feedback = null;

    try {
      const result = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
      });

      if (result.error) {
        this.feedback = {
          type: "error",
          message: result.error.message || "Registration failed",
        };
      } else {
        this.feedback = {
          type: "success",
          message: "Registration successful!",
        };
        this.resetForm();
      }
    } catch (error) {
      this.feedback = {
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
      };
    } finally {
      this.processing = false;
    }
  }
}
