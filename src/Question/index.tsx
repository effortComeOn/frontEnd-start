import React, { useEffect, useState } from "react";
import { Input, Button, Select } from 'antd';


const options = ['html', 'css', 'js', 'computer', 'highFrequency']
const arr = require('./question.json')

export default () => {

    const [source, setSource] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [data, setData] = useState([])
    const [key, setKey] = useState('computer')

    const buildQuestion = (val: string) => {
        const arr: any = [...data];
        arr.push({
            title: val,
            category: key,
            ansysis: ""
        })
        setData(arr)
    }
    const onSearch = (value: string) => {
        buildQuestion(value)
    }

    const buildAnsysis = (value: string) => {
        const obj: any = data[data.length - 1]
        obj.ansysis = value
        console.log(JSON.stringify(obj))
        // if (currentIndex < source.length - 1) {
        //     setCurrentIndex(currentIndex + 1)
        // }
    }

    return <>
        <Select style={{ width: '52%', marginBottom: '10px' }} value={key} onChange={(value) => {
            setKey(value)
        }}>
            {
                options.map(item => {
                    return <Select.Option value={item} >
                        {item}
                    </Select.Option>
                })
            }
        </Select>
        <Input.Search style={{ width: '52%', marginBottom: '10px' }} onSearch={onSearch} onPressEnter={(e) => {
            e.persist()
            buildQuestion(e.currentTarget.value)
        }}></Input.Search>
        <Button style={{ width: '52%', marginBottom: '10px' }} onClick={() => {
            const str = JSON.stringify(data)
            console.log(str)
        }}>查看数据</Button>

        <div>
            {/* <div>第{currentIndex}题，{source[currentIndex].title}</div> */}
            <Input.TextArea rows={4} onPressEnter={(e) => {
                e.persist()
                buildAnsysis(e.currentTarget.value)
            }}></Input.TextArea>

            <Button onClick={() => { if (currentIndex) setCurrentIndex(currentIndex - 1) }}>上一题</Button>
            <Button onClick={() => { if (currentIndex < source.length - 1) setCurrentIndex(currentIndex + 1) }}>下一题</Button>
        </div>
    </>
}