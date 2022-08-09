import styles from './Modal.module.scss'
import classNames from 'classnames'
import Episodes from './../../episodes/'
import { memo } from 'react'

interface IModalProps {
  active: Boolean
  setActive: Dispather<boolean>
  pickedCharacter: Character
}

const Modal: React.FC<IModalProps> = ({
  active,
  setActive,
  pickedCharacter,
}) => {
  return (
    <div
      className={classNames(styles.modal, {
        [styles.modal__active]: active,
      })}
      onClick={() => {
        setActive(false)
        pickedCharacter = { ...pickedCharacter }
      }}>
      <div
        className={classNames(styles.content, {
          [styles.content__active]: active,
        })}
        onClick={(e) => e.stopPropagation()}>
        <img
          className={styles.content__img}
          src={pickedCharacter.image}
          alt=''
        />
        <div className={styles.content__description}>
          <ul className={styles.content__list}>
            <li className={styles.content__item}>
              Name: {pickedCharacter.name}
            </li>
            <li className={styles.content__item}>
              Status: {pickedCharacter.status}
            </li>
            <li className={styles.content__item}>
              Species: {pickedCharacter.species}
            </li>
            <li className={styles.content__item}>
              Type: {pickedCharacter.type || 'None'}
            </li>
            <li className={styles.content__item}>
              Gender: {pickedCharacter.gender}
            </li>
            <li className={styles.content__item}>
              Origin: {pickedCharacter.origin.name}
            </li>
            <li className={styles.content__item}>
              Location:
              {pickedCharacter.origin.name === pickedCharacter.location.name
                ? ' In the same place'
                : pickedCharacter.location.name}
            </li>
            <li className={styles.content__item}>
              <div>Episodes:</div>
              <Episodes episodes={pickedCharacter.episode} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
