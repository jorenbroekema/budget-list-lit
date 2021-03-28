export default {
  participants: ['Joren', 'Pascal', 'Leonieke', 'Diana', 'Marius', 'Matias', 'Mihnea', 'Robert'],
  templateData: {
    participantNameLower() {
      return this.participantName.toLowerCase();
    },
    transaction() {
      return this.participantName === 'DannyEngelman'
        ? 'Vriendenkring overtuigen over te stappen naar Rabo'
        : 'Restaurant dinner';
    },
  },
  targetOptions: {
    mode: 'module',
  },
};
