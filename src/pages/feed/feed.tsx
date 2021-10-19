import { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Feed, Stats } from '../../components'
import { wsConnectionStart } from '../../store/actions/ws'
import styles from './feed.module.css'

const FeedPage: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnectionStart('wss://norma.nomoreparties.space/orders/all'))
  }, [dispatch])
  return (
    <div className={styles.grid}>
      <Feed />
      <Stats />
    </div>
  )
}

export default FeedPage
