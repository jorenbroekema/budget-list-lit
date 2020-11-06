export default {
  appKey: '0c973ea6d2cb58b405035343a1c3df33c1555310c0046784f1286fa5',
  participants: ['Joren', 'Willem'],
  admins: ['Joren'],
  adminPassword: 'pineapples',
  templateData: {
    participantNameLower() {
      return this.participantName.toLowerCase();
    },
  },
  targetOptions: {
    mode: 'module',
  },
};
