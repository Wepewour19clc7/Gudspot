import React from 'react'

import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}



const App = () => {
  return (
    <React.Fragment>
      <div className={'text-blue-400'}>Hello world</div>

      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Select defaultValue="lucy" style={{ width: 120 }} disabled>
        <Option value="lucy">Lucy</Option>
      </Select>
      <Select defaultValue="lucy" style={{ width: 120 }} loading>
        <Option value="lucy">Lucy</Option>
      </Select>
      <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
        <Option value="lucy">Lucy</Option>
      </Select>
    </React.Fragment>
  )
}

export default App
