import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  inProgess: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    reposList: [],
    apiStatus: apiStatusConstants.inProgess,
  }

  componentDidMount() {
    this.fetchReposData()
  }

  updateActiveFilterId = activeFilterId => {
    this.setState(
      {
        activeFilterId,
      },
      this.fetchReposData,
    )
  }

  fetchReposData = async () => {
    const {activeFilterId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    try {
      const response = await fetch(apiUrl)

      if (response.ok === true) {
        const data = await response.json()

        const updatedData = data.popular_repos.map(eachItem => ({
          name: eachItem.name,
          id: eachItem.id,
          issuesCount: eachItem.issues_count,
          forksCount: eachItem.forks_count,
          starsCount: eachItem.stars_count,
          avatarUrl: eachItem.avatar_url,
        }))
        this.setState({
          reposList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } catch (err) {
      console.log(err)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list-container">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} reposDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    const {activeFilterId} = this.state

    return (
      <div className="app-container">
        <h1 className="app-heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              filterData={eachItem}
              updateActiveFilterId={this.updateActiveFilterId}
              isActive={activeFilterId === eachItem.id}
            />
          ))}
        </ul>
        {this.renderContent()}
      </div>
    )
  }
}
export default GithubPopularRepos
