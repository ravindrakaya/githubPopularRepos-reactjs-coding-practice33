// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {reposDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = reposDetails

  return (
    <li className="repos-list-item">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repos-heading">{name}</h1>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon-img"
        />
        <p className="icon-text">{starsCount} stars</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-img"
        />
        <p className="icon-text">{forksCount} forks</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon-img"
        />
        <p className="icon-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
