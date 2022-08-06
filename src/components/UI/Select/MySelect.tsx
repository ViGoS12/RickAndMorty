import Select, { SingleValue } from 'react-select'

import './select.scss'

interface IMySelectProps {
  value: string
  options: IOption[]
  filter: string
  onChange: (filter: string, value: string) => void
}

const MySelect: React.FC<IMySelectProps> = ({
  value,
  options,
  filter,
  onChange,
}) => {
  const handleChange = (newValue: SingleValue<any>) => {
    onChange(filter, newValue.value)
  }

  const getValue = () => {
    return value ? options.find((v) => v.value === value) : null
  }

  return (
    <Select
      value={getValue()}
      classNamePrefix='select'
      onChange={handleChange}
      options={options}
      placeholder='Choose status...'
      isSearchable={false}
    />
  )
}

export default MySelect
