import { Input } from "antd";
import { memo, useState, useCallback, useLayoutEffect } from "react";
import debounce from "lodash.debounce";

function InputSearch(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);

  return (
    <Input
      size={props.size}
      placeholder={props.placeholder}
      prefix={props.prefix} 
      value={value}
      onChange={onChange}/>
  );
}

export default memo(InputSearch);