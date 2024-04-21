## Calendar

Demo:

```tsx
import React, { useState } from 'react';
import { Calendar } from 'frontEnd-start';
const [date, setDate] = useState('');

const onChange = (date) => {
    console.log(date.getDate())
  setDate(date.getDate());
};

export default () => (
  <>
    <Calendar onChange={onChange} />
    <div>{date}</div>
  </>
);
```
