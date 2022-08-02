import styles from './Modal.module.scss'
import classNames from 'classnames'

interface IModalProps {
  active: Boolean
  setActive: Dispather<boolean>
  children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ active, setActive, children }) => {
  console.log(active)
  return (
    <div
      className={classNames(styles.modal, {
        [styles.modal__active]: active,
      })}
      onClick={() => setActive(false)}>
      <div
        className={classNames(styles.modal__content, {
          [styles.modal__content_active]: active,
        })}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
