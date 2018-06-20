import React from 'react';

const Selector = (props) =>
<select onChange={props.onChangeCallback}>
{props.values.map(v => <option key={v} value={v}>{v}</option>)}
</select>;

export default Selector;
