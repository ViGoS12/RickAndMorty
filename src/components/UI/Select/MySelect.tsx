import Select, { SingleValue } from 'react-select'

import './select.scss'

interface IMySelectProps {
  options: IOption[]
  filter: string
  onChange: (filter: string, value: string) => void
}

const MySelect: React.FC<IMySelectProps> = ({ options, filter, onChange }) => {
  const handleChange = (newValue: SingleValue<IOption>) => {
    if (newValue?.value) {
      onChange(filter, newValue.value)
    }
  }

  return (
    <>
      <Select
        classNamePrefix='select'
        onChange={handleChange}
        options={options}
        placeholder='Choose status...'
        isSearchable={false}
      />
    </>
  )
}

export default MySelect
