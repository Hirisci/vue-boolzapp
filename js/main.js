var DateTime = luxon.DateTime;
let app = new Vue({
  el: "#app",
  data: {
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di stendere i panni",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro B.",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro L.",
        avatar: "_5",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ricordati di chiamare la nonna",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Va bene, stasera la sento",
            status: "received",
          },
        ],
      },
      {
        name: "Claudia",
        avatar: "_6",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao Claudia, hai novità?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Non ancora",
            status: "received",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "Nessuna nuova, buona nuova",
            status: "sent",
          },
        ],
      },
      {
        name: "Federico",
        avatar: "_7",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
          },
        ],
      },
      {
        name: "Davide",
        avatar: "_8",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "OK!!",
            status: "received",
          },
        ],
      },
    ],
    currentChat: 0,
    messageText: "",
    filter: "",
  },
  methods: {
    getImgAvatar(obj) {
      return "img/avatar" + obj.avatar + ".jpg";
    },
    imgAvatar(i) {
      return "img/avatar" + this.contacts[i].avatar + ".jpg";
    },
    lastMessage(i) {
      if (!this.contacts[i].messages.at(-1)) {
        return " ";
      } else {
        return this.contacts[i].messages.at(-1).message;
      }
    },
    getTimeLastMessage(i) {
      if (!this.contacts[i].messages.at(-1)) {
        return " ";
      } else {
        return this.getTimeChat(this.contacts[i].messages.at(-1).date);
      }
    },
    getTimeChat(date) {
      return DateTime.fromFormat(
        date,
        "dd'/'LL'/'yyyy' 'HH':'mm':'ss"
      ).toFormat("HH':'mm");
    },
    selectChat(obj) {
      this.contacts.forEach((elm, index) => {
        if (elm.avatar === obj.avatar) {
          this.currentChat = index;
          return;
        }
      });
    },
    addMessageText() {
      let msg = this.createMessage();
      this.contacts[this.currentChat].messages.push(msg);
      this.messageText = "";
      setTimeout(() => {
        let risp = this.createMessage();
        risp.message = "ok";
        risp.status = "received";
        this.contacts[this.currentChat].messages.push(risp);
      }, 1000);
      // objDiv.scrollTop = objDiv.scrollHeight;
    },
    createMessage() {
      let msg = {
        date: this.createDate(),
        message: this.messageText,
        status: "sent",
        openMenu: false,
      };
      return msg;
    },
    createDate() {
      return DateTime.now().toFormat("dd'/'LL'/'yyyy' 'HH':'mm':'ss");
    },
    toggleOpenMenu(obj) {
      obj.openMenu = !obj.openMenu;
    },
    delateMessage(i) {
      this.contacts[this.currentChat].messages.splice(i, 1);
      console.log(this.contacts[this.currentChat].messages.length);
    },
  },
  computed: {
    filterByName() {
      return this.contacts.filter((elm) =>
        elm.name.toLowerCase().includes(this.filter)
      );
    },
  },
  created() {
    this.contacts.forEach((m) =>
      m.messages.forEach((x) => Vue.set(x, "openMenu", false))
    );
  },
});
