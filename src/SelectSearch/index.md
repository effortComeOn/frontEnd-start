```tsx
import React from 'react';
import SelectSearch from './index.tsx';

const options = [
  {
    key: 'name',
    value: 'name',
  },
  {
    key: 'name1',
    value: 'name1',
  },
  {
    key: 'name2',
    value: 'name2',
  },
];

const onOptionClick = (val) => {
  console.log(val);
};

export default () => (
  <SelectSearch
    isSearch={true}
    options={options}
    onOptionClick={onOptionClick}
    defaultValue={name}
  />
);
```
