export default {
  participants: [
    'Bartosz Starakiewicz',
    'Chayanika Khatua',
    'Ekaterina',
    'Joren Broekema',
    'Meijer, J. (Joke)',
    'Nusse, B. (Bertram)',
    'Sukh',
    'Vlad',
    'mfluit',
    'onkar75',
    '\u0218erb\u0103nescu, V.N. (Vlad)',
  ],
  templateData: {
    participantNameLower() {
      return this.participantName.toLowerCase();
    },

    participantNameLowerWithoutLastName() {
      return this.participantName.toLowerCase().split(' ')[0];
    },

    participantWithoutLastname() {
      return this.participantName.split(' ')[0];
    },
  },
  targetOptions: {
    mode: 'module',
  },
};
