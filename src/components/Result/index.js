import React, { useMemo, useState } from 'react'
import { Button, Space, Table, Tag, Typography } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import passed from '../../assets/img/passed.png'
import failed from '../../assets/img/failed.png'

const ResultCpm = ({ score, timeStart, check, onClick, record }) => {
    const [timeEnd, setTimeEnd] = useState(new Date().getTime())
    const [showRecord, setShowRecord] = useState(false)

    const time = useMemo(() => {
        return Math.round((timeEnd - timeStart) / 1000)
    }, [])

    const checkPassTest = useMemo(() => {
        return score >= Math.ceil(check / 2)
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question'
        },
        {
            title: 'Your Answer',
            dataIndex: 'yourAnswer',
            key: 'yourAnswer',
        },
        {
            title: 'Correct Answer',
            dataIndex: 'correctAnswer',
            key: 'correctAnswer',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                return <Tag icon={status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={status ? 'success' : 'error'}>
                    {status ? 'Correct' : "Wrong"}
                </Tag>
            }
        }
    ];


    const data = record.map((quiz, index) => {
        return (
            {

                key: index,
                index: index + 1,
                question: quiz[1].question,
                yourAnswer: quiz[0].titleAnswer,
                correctAnswer: quiz[1].optionAnswer[0].titleAnswer,
                status: quiz[0].titleAnswer === quiz[1].optionAnswer[0].titleAnswer ? true : false
            }
        )
    })

    return (
        <>
            {showRecord ? <>
                <Typography.Title>Result details</Typography.Title>
                <Table scroll={{y: 300}} pagination={false} style={{ maxWidth: '90%' }} columns={columns} dataSource={data} footer={() => <>
                    <h4>Summary: {score}/{data.length} correct answers in {time} seconds</h4>
                    <h4>Status: <Tag  color={checkPassTest ? 'success' : 'error'}>
                    {checkPassTest ? 'Passed' : 'Failed'}
                </Tag></h4>
                </>} />
            </> : (
                <>
                    <div className='result'>
                        {checkPassTest ?
                            <>
                            <img src={passed} alt='passed' width={200}/>
                            <h1>✨ Congratulations ✨ </h1>
                            </>
                            :
                            <>
                            <img src={failed} alt='failed' width={200}/>
                            <h1>🤗 Completed 🤗 </h1>
                            </>
                        }
                        {checkPassTest ?
                            <h4 className='correct'>
                                You passed the test!
                            </h4>
                            :
                            <h4 className='wrong'>
                                Wish you better luck next time!
                            </h4>
                        }
                        <h3>
                            Time: {time} seconds
                        </h3>
                        <h3>Your Score: {score} / {check}</h3>
                    </div></>
            )}

            <Space>
                <Button type="primary" shape="round" size={50} onClick={onClick}>
                    Test Again
                </Button>
                <Button type="default" danger shape="round" disabled={showRecord} size={50} onClick={() => setShowRecord(true)}>
                    Show record
                </Button>
            </Space>
        </>
    )
}

export default ResultCpm