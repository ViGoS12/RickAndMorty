import styles from './CharacterCard.module.scss'

const CharacterCard: React.FC<items> = ({
  id,
  name,
  image,
  status,
  species,
}) => {
  type statusColorProps = { [key: string]: string }

  const statusColor: statusColorProps = {
    Alive: '#55cc44',
    Dead: '#d63d2e',
    unknown: '#9e9e9e',
  }

  return (
    <div className={styles.characterCard}>
      <img className={styles.characterCard__img} src={image} alt='' />
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
    </div>
  )
}

export default CharacterCard
