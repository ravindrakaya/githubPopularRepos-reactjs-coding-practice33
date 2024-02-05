// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterData, updateActiveFilterId, isActive} = props
  const {id, language} = filterData

  const btnClassName = isActive
    ? 'filter-button active-filter'
    : 'filter-button'

  const onClickFilterItemBtn = () => {
    updateActiveFilterId(id)
  }

  return (
    <li>
      <button
        type="button"
        className={btnClassName}
        onClick={onClickFilterItemBtn}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
