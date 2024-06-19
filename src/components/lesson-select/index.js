import { memo, useCallback } from 'react'
import { Select } from 'antd';
import './style.css'

function LessonSelect({ defaultValue, mode, onChange, placeholder, selectOptions, loading, value }) {

  return (
    <Select className='LessonSelect' size="large"
      mode={mode}  
      allowClear
      defaultValue={defaultValue}
      showSearch
      onChange={onChange}
      placeholder={placeholder}
      maxTagCount= {1}
      value={value}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
      options={selectOptions} loading={loading}/>
  )
}

export default memo(LessonSelect);