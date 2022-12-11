<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <div class="flex items-center justify-center">
        <router-link to="/">
          <a class="navbar-brand flex items-center" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-link mr-3 text-white"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"
              />
              <path
                d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"
              />
            </svg>
            <span class="text-white font-bold text-4xl"> a.nak </span>
          </a>
        </router-link>
      </div>

      <form class="pb-2 text-center">
        <div class="pt-2">
          <input
            placeholder="Email"
            type="text"
            class="border p-2"
            v-model="App.input.user.email"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            class="border p-2 mt-2"
            v-model="App.input.user.password"
          />
        </div>
        <a
        href="#"
              role="button"
          class="p-2 bg-blue-700 font-bold rounded-md text-center mt-4 px-4"
          @click="App.addRegister(App.input.user)"
        >
          Daftar
        </a>
      </form>

      <p class="my-2 text-xl">
        Do you have an account?
        <span class="font-bold underline">
          <router-link to="/login"> Login</router-link>
        </span>
      </p>
      <div v-if="isSuccess != null">
        <h1 v-if="isSuccess === true">Berhasil Mendaftar</h1>
        <h1 v-if="isSuccess === false">Gagal Mendaftar</h1>
      </div>
    </div>
  </div>
</template>

<script>
import {useApp} from '../../stores/index';
export default {
  setup() {
    const App = useApp();
    return {
      App,
    }
  },
  created() {
  }
}
</script>

<!-- <template>
    <div class="mt-8">
        <div class="lg:col-span-2">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              
              <div class="md:col-span-5">
                  <label for="email">Email</label>
                  <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  v-model="App.input.user.email" placeholder="email@domain.com" />
                </div>
                
                <div class="md:col-span-5">
                  <label for="password">Password</label>
                  <input type="password" name="password" id="password" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                  v-model="App.input.user.password" />
                </div>

            <div class="md:col-span-5 text-right">
              <div class="inline-flex items-end">
                <button @click="App.addRegister(App.input.user)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
            </div>
            <router-link
                to="/login"
                class="bg-yellow-400 p-2 rounded-md text-black"
                >
                cancel</router-link
                >
          </div>
        </div>
    </div>
</template>

<script>
import {useApp} from '../../stores/index';
export default {
  setup() {
    const App = useApp();
    return {
      App,
    }
  },
  created() {
  }
}
</script> -->
