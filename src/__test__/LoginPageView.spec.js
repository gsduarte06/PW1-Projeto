import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // Ensure this is installed
import router from "@/router";
import LoginPageView from "@/views/LoginPageView.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("LoginPageView.vue", () => {
  it("Renders Login Page when the route is /login", async () => {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate); // Register the persist plugin

    const wrapper = mount(LoginPageView, {
      global: {
        plugins: [router, pinia],
      },
    });

    await router.push("/login");
    await router.isReady();

    expect(wrapper.text()).toContain("Login");
  });
});
