export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring', // Utilise une animation de type ressort
      stiffness: 50, // Force du ressort
      damping: 15, // Amortissement
      mass: 2, // Effet de poids
    },
  }),
};
