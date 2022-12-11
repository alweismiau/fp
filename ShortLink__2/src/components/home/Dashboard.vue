<template>
  <div class="app">
    <!-- navbar -->
    <div class="container">
      <nav class="navbar" style="background-color: #8cb68c; padding: 8px">
        <a class="navbar-brand" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-link"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"
            />
            <path
              d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"
            />
          </svg>
          a.nak
        </a>
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          @click.prevent="logout"
        >
          Log out
        </button>
      </nav>
      <div class="greeting">
        <h1>Hi,anak!</h1>
      </div>
    </div>
    <!-- navbar -->

    <!-- input link -->
    <form>
      <label for="input">
        <div class="input flex">
          <label class="margin-auto"> HTTPS:// </label>
          <input
            type="url"
            v-model="newLink"
            class="form-control"
            id="longurl"
            placeholder="Drop your long URL Here."
          />
        </div>

        <!--Tambah link-->
      </label>
      <label for="input2">
        <div class="input2">
          <a
            @click.prevent="addLink"
            style="background-color: #537155"
            class="btn"
            role="button"
            >Shorten!</a
          >
        </div>
      </label>
    </form>
    <!-- input link -->

    <!-- table list -->
    <div class="table1">
      <table
        style="background-color: #d4e5d4"
        class="table table-striped table-light"
      >
        <thead>
          <th scope="col">No.</th>
          <th scope="col">List</th>
          <th scope="col">Shorted Link</th>
          <th scope="col">Open</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listLink" v-bind:key="index">
            <td class="border border-slate-600" v>{{ index + 1 }}</td>
            <td class="border border-slate-600">
              <input
                v-model="item.destination"
                class="border p-2 mx-1 bg-gray-600 rounded-xl"
              />
            </td>
            <!-- <td class="border border-slate-600">bit.ly/{{item.data.shorted}}</td> -->
            <td class="border border-slate-600">
              localhost:5173/to/<input
                v-model="item.shortLink"
                class="border p-2 mx-1 bg-gray-100 rounded-xl"
              />
            </td>
            <td>
              <a
                :href="`http://localhost:5173/to/${item.shortLink}`"
                class="p-1 bg-blue-500 rounded-lg"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10 text-black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </a>
            </td>
            <td>
              <button
                class="p-1 bg-blue-500 rounded-lg"
                @click.prevent="saveEdit(index)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            </td>
            <td>
              <button
                class="p-1 bg-red-500 rounded-lg"
                @click.prevent="deleteLink(item.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x-octagon-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- table list -->
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
        destination: this.newLink,
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
  },
};
</script>
<style scoped>
h1 {
  display: flex;
  text-align: left;
  font-family: verdana;
  margin: 40px 0 0;
  font-size: 25px;
  font-weight: 700;
}
#name {
  margin: 2px 2px 0px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.container {
  display: grid;
  margin-top: 30px;
}
.input {
  font-family: monospace;
  display: inline-flex;
  padding: 50px 10px 0 0;
  width: 10cm;
  margin: 20px 20px 0 500px;
}
.table {
  align-content: center;
  margin: 50px 414px 0 400px;
  width: 45%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  background-color: #a1a1a1;
}
.navbar {
  border-radius: 5px;
}
a {
  color: #ffffff;
}
</style>
