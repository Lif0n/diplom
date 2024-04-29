import { memo, useCallback } from 'react'
import { Select } from 'antd';
import './style.css'

function LessonSelect({ defaultValue, onChange, placeholder, selectOptions }) {

  return (
    <Select className='LessonSelect' size="large"
      defaultValue={defaultValue}
      showSearch
      onChange={onChange}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
      options={selectOptions} />
  )
}

export default memo(LessonSelect);