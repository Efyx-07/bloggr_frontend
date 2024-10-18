import { motion } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

export function AnimatedPageWrapper({ children }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
