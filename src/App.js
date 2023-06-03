import './App.css';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import Quiz from './components/Quiz/QuizCpm';
import logo from '../src/assets/img/icon-learn.png'

function App() {
  const [takingQuiz, setTakingQuiz] = useState(true)
  const [data, setData] = useState([])

  const changeMode = () => {
    setTakingQuiz(true)
  }
  useEffect(() => {
    fetch('http://localhost:4000/quiz')
        .then(res => res.json())
        .then(data =>
            setData(data)
        )
}, [])

  return (
    <div className="main">
      <div className='container'>

        {takingQuiz ?
          (
            <>
              <div className='content'>
                <div className='logo'>
                  <img src={logo} alt='logo' width={300} />
                </div>
                <div className='btn-start'>
                  <Button style={{ display: 'block' }} type="primary" shape="round" size='large' onClick={() => setTakingQuiz(false)}>
                    Start Quiz
                  </Button>
                </div>
              </div>
            </>
          ) : <Quiz onClick={changeMode} data={data}/>
        }
      </div>
    </div>
  );
}

export default App;
