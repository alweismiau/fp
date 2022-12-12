<template>
  <div>
    <nav class="navbar" style="background-color: #8cb68c">
      <div class="flex justify-between px-36 py-2">
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
          <span class="text-white font-bold text-xl"> a.nak </span>
        </a>
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          @click.prevent="logout"
        >
          Log out
        </button>
      </div>
    </nav>
    <!-- navbar -->

    <div class="px-40 py-5">
      <div class="text-4xl font-mono font-semibold mt-10">
        <h1>Hi,anak!</h1>
      </div>
      <div class="flex">
        <form class="mt-5 flex gap-x-4 m-auto">
          <div class="flex items-center w-ful">
            <label class="text-xl font-bold font-mono"> HTTPS:// </label>
            <input
              type="url"
              v-model="newLink"
              class="border px-3 py-2 rounded-xl w-[400px]"
              placeholder="Drop your long URL Here."
            />
          </div>

          <a
            @click.prevent="addLink"
            style="background-color: #537155"
            class="text-white font-mono text-lg px-3 py-2 rounded-lg bg-[#537155] hover:bg-green-900"
            role="button"
            >Shorten!</a
          >
        </form>
      </div>

      <div class="flex">
        <table class="table-auto mt-10 border-2 border-green-400 w-full">
          <thead class="border-2 border-green-400">
            <th class="p-5 border-2 border-green-400 w-10">No.</th>
            <!-- <th class="p-5 border-2 border-green-400">Title</th> -->
            <th class="p-5 border-2 border-green-400 w-96">Destination</th>
            <th class="p-5 border-2 border-green-400 w-80">Shorted Link</th>
            <th class="p-5 border-2 border-green-400 w-10">Total Click</th>
            <th class="p-5 border-2 border-green-400 w-20">Actions</th>
            <!-- <th class="p-5 border-2 border-green-400">Edit</th>
            <th class="p-5 border-2 border-green-400">Delete</th> -->
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listLink"
              v-bind:key="index"
              class="text-center text-md"
            >
              <td class="border-2 border-green-400" v>{{ index + 1 }}</td>
              <!-- <td class="border-2 border-green-400" v>{{ item.title }}</td> -->
              <td class="border-2 border-green-400 px-2">
                <input
                  v-model="item.destination"
                  class="border p-2 bg-gray-50 rounded-xl w-full"
                />
              </td>
              <!-- <td class="border border-slate-600">bit.ly/{{item.data.shorted}}</td> -->
              <td class="border-2 border-green-400 px-4">
                localhost:5173/to/<input
                  v-model="item.shortLink"
                  class="border p-2 mx-1 bg-gray-50 rounded-xl font-bold"
                />
              </td>
              <td class="border-2 border-green-400 px-4">
                {{ item.clickCount }}
              </td>
              <td class="px-5">
                <div class="flex justify-between gap-x-2">
                  <a
                    :href="`http://localhost:5173/to/${item.shortLink}`"
                    class="py-1 px-3 bg-blue-400 rounded-lg"
                    target="_blank"
                  >
                    Open
                  </a>

                  <button
                    class="py-1 px-3 bg-yellow-500 rounded-lg"
                    @click.prevent="saveEdit(index)"
                  >
                    Edit
                  </button>

                  <button
                    class="py-1 px-3 bg-red-500 rounded-lg"
                    @click.prevent="deleteLink(item.id)"
                  >
                    Delete
                  </button>
                  <button
                    class="py-1 px-3 bg-orange-400 rounded-lg"
                    @click.prevent="
                      copyURL(`http://localhost:5173/to/${item.shortLink}`)
                    "
                  >
                    Copy
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "Dashboard",
  data: () => ({
    newLink: "",
    listLink: [],
    totalLink: 0,
  }),

  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.setItem("authenticated", false);
      router.push({ name: "Login" });
    };
    return { logout };
  },

  mounted() {
    onSnapshot(collection(database, "links"), (querySnapshot) => {
      const temp = [];
      this.totalLink = querySnapshot.size;
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      console.log(temp);

      this.listLink = temp;
    });
  },

  methods: {
    async getAll() {
      await axios.get("http://127.0.0.1:3000/all").then((response) => {
        this.listLink = response.data;
        console.log(this.listLink);
      });
    },
    async addLink() {
      const randomCode = Math.random().toString(36).substring(7);
      const data = {
        title: "", //this.title,
        destination: this.newLink.replace("https://", ""),
        shortLink: randomCode,
      };
      await axios.post(`http://127.0.0.1:3000/add`, data);
      // .then(() => this.$router.go("/dashboard"));
    },

    async deleteLink(idDoc) {
      await axios.delete(`http://127.0.0.1:3000/delete/${idDoc}`).then(() => {
        this.$router.go("/dashboard");
      });
    },
    async saveEdit(idx) {
      const data = this.listLink[idx];
      await axios
        .post(`http://127.0.0.1:3000/update/${data.id}`, data)
        .then((response) => {
          alert("Berhasil Simpan");
        });
    },

    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
  },
};
</script>

