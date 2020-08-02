<template>
  <div>
    <div class="d-flex" id="chatbox">
      <div id="connected" class="px-2 py-2">
        <h4>Utilisateurs connectés</h4>
        <div class="d-flex justify-column" v-for="user in connected" v-bind:key="user">
          <span>{{user}}</span>
        </div>
      </div>
      <div>
        <div class="my-3 mx-3" v-for="message in messages" v-bind:key="message">
          <b>{{ message.user }}</b>
          <div>{{ message.message }}</div>
        </div>
        <v-form ref="form" class="d-flex fix-bottom" v-model="valid" lazy-validation>
          <v-text-field
            v-on:keyup.enter="sendMessage"
            v-model="message"
            label="Votre message..."
            required
          ></v-text-field>
          <v-btn @click="sendMessage" small text color="#f44336" class="mt-4">Envoyer</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
let socket = io.connect("http://localhost:3000");
export default {
  data() {
    return {
      valid: true,
      body: "",
      rules: {
        body: v =>
          /^[\s\w-éàëêâ]{5,100}\w$/.test(v) ||
          "Le texte est invalide, il ne doit contenir que des caractères non spéciaux (min 5, max 100)"
      },
      connected: [],
      messages: [],
      message: "",
      username: this.$store.getters.fullName,
      state: 1
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    sendMessage: function() {
      socket.emit("message", this.message);
      this.message = "";
    },
    setUsername: function() {
      socket.emit("join", this.username);
      this.state = 1;
    }
  },
  mounted: function() {
    socket.on("connected", array => {
      this.connected = array;
    });
    socket.on("message", message => {
      this.messages.push(message);

      this.$nextTick(function() {
        let messageBox = document.getElementById("chatbox");
        messageBox.scrollTop = messageBox.scrollHeight;
      });
    });
    this.setUsername();
  },
  destroyed: function() {
    socket.emit("leave", this.username);
  }
};
</script>


<style scoped>
#chatbox {
  height: 83vh;
  max-width: 100%;
  overflow-y: scroll;
}

#connected {
  background-color: white;
  border-right: 2px solid black;
}

.fix-bottom {
  position: fixed;
  bottom: 30px;
  width: 70%;
}
</style>
