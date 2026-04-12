import { motion, AnimatePresence } from 'framer-motion';

export function DeleteButton({ isVisible, count, onDelete }: any) {
  return (
    <AnimatePresence>
      {isVisible && count > 0 && (
        <motion.button initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}onClick={onDelete}
          style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',backgroundColor: '#ff5252', color: 'white', border: 'none', 
            borderRadius: '20px', padding: '10px 25px', boxShadow: '0 4px 15px rgba(255,82,82,0.4)', zIndex: 100, cursor: 'pointer', fontWeight: 'bold'
          }}> Elimina {count} Clip
        </motion.button>
      )}
    </AnimatePresence>
  );
}