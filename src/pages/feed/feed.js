import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Feed, Stats } from '../../components'
import { wsConnectionStart } from '../../store/actions/ws'
import styles from './feed.module.css'

function FeedPage() {
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
