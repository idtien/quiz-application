import React, { useEffect, useState } from 'react'
import ResultCpm from '../Result'
import { Button, Modal, Progress, Radio, Space, Tag, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './quiz.css'

const Quiz = ({ data, onClick }) => {
    const [value, setValue] = useState();
    const [disable, setDisable] = useState(true)
    const [disableChose, setDisableChose] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    let [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [mess, setMess] = useState('')
    const [timeStart, setTimeStart] = useState(new Date().getTime())
    const [showResult, setShowResult] = useState(false)
    const [recordAnswer, setRecordAnswer] = useState([])
    const [confirmExit, setConfirmExit] = useState(false)
    let [percentProgress, setPercentProgress] = useState(0)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (value || value === 0) {
            setDisable(false)
        }
    }, [value])

    useEffect(() => {
        if (currentIndex >= data.length) {
            setShowResult(true)
        }
    }, [currentIndex, data.length])

    const handleSubmitAns = (answer) => {
        setDisable(true)
        setDisableChose(true)
        setPercentProgress(percentProgress+=10)

        const trueAnswer = data[currentIndex].optionAnswer.filter((ans) =>
            ans.isCorrect === true
        )

        setRecordAnswer([
            ...recordAnswer,
            [answer, { question: data[currentIndex].question, optionAnswer: trueAnswer }]
        ])

        if (answer.isCorrect) {
            setMess('Correct Answer')
            setScore(score += 1)
            
        } else {
            setMess('Wrong Answer')
        }

        setTimeout(() => {
            setCurrentIndex(currentIndex + 1)
            setMess('')
            setValue()
            setDisableChose(false)
        }, 800)
    }

    const handleConfirmExit = () => {
        setConfirmExit(true)
    }
    const handleOk = () => {
        onClick()
    }
    const handleCancel = () => {
        setConfirmExit(false)
    }

    return (
        <>
            <div className='quiz' >
                {currentIndex < data.length && (
                    <>
                        <Space direction="horizontal">
                            <Progress percent={percentProgress} success={{ percent: 0 }} size={[400, 15]} showInfo={false} />
                            <Tooltip placement="top" title="Exit">
                                <Button shape='circle' onClick={handleConfirmExit}>
                                    <CloseOutlined />
                                </Button>
                            </Tooltip>
                            <Modal centered title="Notification" open={confirmExit} onOk={handleOk} onCancel={handleCancel}>
                                <p>Do you want to exit this test?</p>
                            </Modal>
                        </Space>

                        <div className='quiz__title' >
                            <h4><Tag style={{ fontSize: 18, padding: 4 }} color="processing">Questions:  {currentIndex + 1}/{data.length}</Tag></h4>
                            <h4><Tag style={{ fontSize: 18, padding: 4 }} color="success">Score: {score}</Tag></h4>
                        </div>

                        <div className='quiz__question'>
                            <h4 style={{ textAlign: 'left' }}>
                                Question {currentIndex + 1}: {data[currentIndex]?.question}
                            </h4>
                        </div>

                        <div className='quiz__optionsAnswer'>
                            <Radio.Group onChange={onChange} value={value}>
                                <Space direction="vertical">
                                    {data[currentIndex]?.optionAnswer?.map((ans, index) => {
                                        return (
                                            <div key={index}>
                                                <Button style={{ minWidth: 300,textAlign: 'left' }} disabled={disableChose} className={answer.isCorrect ? 'correct' : 'wrong'} shape="round" size={50} >
                                                        <Radio style={{ minWidth: 300}} value={index} disabled={disableChose} onChange={() => setAnswer(ans)}>{ans.titleAnswer}</Radio>
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </Space>
                            </Radio.Group>
                            <h5 style={{ marginTop: 10 }} className={answer.isCorrect ? 'correct' : 'wrong'}> {mess}</h5>
                        </div>

                        <div className='quiz__btn'>
                            <Button type="primary" shape="round" size={50} disabled={disable} onClick={() => handleSubmitAns(answer)}>
                                Next
                            </Button>
                        </div>
                    </>
                )}
                
                {showResult && (
                    <ResultCpm score={score} timeStart={timeStart} check={data.length} onClick={onClick} record={recordAnswer} />
                )}
            </div>
        </>
    )
}

export default Quiz