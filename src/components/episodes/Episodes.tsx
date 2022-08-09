import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import styles from './Episodes.module.scss'
import classNames from 'classnames'

interface IEpisodesProps {
  episodes: string[]
}

const Episodes: React.FC<IEpisodesProps> = ({ episodes }) => {
  const { countEpisodes } = useSelector((state: RootState) => state.episodes)

  const characterInEpisodes = episodes.map((episode) => {
    const num = episode.match(/\d+/g)
    return num && Number(num[0])
  })

  const episodeList = Array(countEpisodes)
    .fill(null)
    .map((x, idx) => characterInEpisodes.find((num) => num === idx + 1) || null)

  return (
    <div className={styles.episodes}>
      {episodeList.map((inEpisode, episode) => (
        <button
          className={classNames(
            styles.episodes__btn,
            inEpisode ? styles.episodes__active : styles.episodes__disabled
          )}
          key={episode}>
          {episode + 1}
        </button>
      ))}
    </div>
  )
}

export default Episodes
