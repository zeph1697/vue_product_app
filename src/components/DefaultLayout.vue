<template>
  <div class="min-h-full h-screen w-full flex">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="w-max h-max my-auto py-4 sm:px-6 lg:px-8">
        <div class="flex flex-col h-max items-start justify-between">
          <div class="flex flex-col items-center">
            <router-link class="flex-shrink-0" :to="{ name: 'Dashboard' }">
              <img
                class="max-w-[120px] mt-2 cursor-pointer"
                src="../assets/logo/irender_logo_W.svg"
                alt="Your Company"
              />
            </router-link>
            <div class="hidden md:block">
              <div class="mt-10 flex flex-col items-baseline space-y-8">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  active-class="bg-gray-900 text-white"
                  :class="[
                    this.$route.name == item.to.name
                      ? ''
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                  >{{ item.name }}</router-link
                >
              </div>
            </div>
          </div>

          <div class="ml-2 mt-4 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            active-class="bg-gray-900 text-white"
            :class="[
              this.$route.name == item.to.name
                ? ''
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >{{ item.name }}</DisclosureButton
            >
            <a
              @click="logout"
              :class="[
                'block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer',
              ]"
              >Sign out</a
            >
          </div>
        </div>
      </DisclosurePanel>

      <label
        class="relative inline-flex w-full items-center justify-center cursor-pointer mt-10"
      >
        <input type="checkbox" value="" class="sr-only peer" />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[40px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Dark mode</span
        >
      </label>
    </Disclosure>

    <router-view></router-view>

    <!-- User Profile -->
    <div class="hidden md:block absolute right-8 top-6">
      <div class="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem
                v-for="item in userNavigation"
                :key="item.name"
                v-slot="{ active }"
              >
                <a
                  :href="item.href"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >{{ item.name }}</a
                >
              </MenuItem>

              <a
                @click="logout"
                :class="[
                  'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer',
                ]"
                >Sign out</a
              >
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const navigation = [
  { name: "Dashboard", to: { name: "Dashboard" } },
  { name: "GPU Hub", to: { name: "Hub" } },
  { name: "Payment", to: { name: "Payment" } },
  { name: "Billing transaction", to: { name: "Billing" } },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    Bars3Icon,
    XMarkIcon,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.commit("logout");
      router.push({
        name: "Login",
      });
    }

    return {
      user: computed(() => store.state.user.data),
      navigation,
      userNavigation,
      logout,
    };
  },
};
</script>
