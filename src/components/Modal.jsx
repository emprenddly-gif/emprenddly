export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div>
      <div onClick={onClose}></div>
      <div>
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
    
  );
}
