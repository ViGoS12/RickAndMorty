import styles from './CharacterCard.module.scss'

type statusColorProps = { [key: string]: string }

type CharacterCardProps = Character & {
  onClick: (id: number) => void
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  image,
  status,
  species,
  onClick,
}) => {
  const statusColor: statusColorProps = {
    Alive: '#55cc44',
    Dead: '#d63d2e',
    unknown: '#9e9e9e',
  }

  const cardClick = () => {
    onClick(id)
  }

  return (
    <div className={styles.characterCard} onClick={cardClick}>
      <img className={styles.characterCard__img} src={image} alt='' />
      <div className={styles.characterCard__rightside}>
        <div className={styles.characterCard__property}>
          <div className={styles.characterCard__title}>{name}</div>
          <div className={styles.characterCard__subtitle}>
            <span
              style={{ background: statusColor[status] }}
              className={styles.characterCard__status}
            />
            <div>
              {status} - {species}
            </div>
          </div>
        </div>
        <div className={styles.characterCard__btn}>Show more {'->'}</div>
      </div>
    </div>
  )
}

export default CharacterCard
